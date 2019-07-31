<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title><?php echo $this->get_title(); ?></title>
	<style type="text/css"><?php $this->template_styles(); ?></style>
	<style type="text/css"><?php do_action( 'wpo_wcpdf_custom_styles', $this->get_type(), $this ); ?></style>
</head>
<body class="<?php echo $this->get_type(); ?>">
	<?php echo $content; ?>
</body>
</html>
