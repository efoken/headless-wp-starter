<?php

add_filter( 'woocommerce_rest_prepare_product_object', function ( $response, $post, $request ) {
	if ( empty( $response->data ) ) {
		return $response;
	}
	foreach ( $response->data['images'] as $key => $image ) {
		$response->data['images'][ $key ]['sizes'] = [];
		foreach ( wp_get_additional_image_sizes() as $size => $value ) {
			$response->data['images'][ $key ]['sizes'][] = array_merge([
				'name' => $size
			], array_combine(
				[ 'src', 'width', 'height', 'resized' ],
				wp_get_attachment_image_src( $image['id'], $size )
			));
		}
	}
	return $response;
}, 10, 3 );
