<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @yield("title")

    {!! Html::style("css/admin/app.css") !!}
    {!! Html::script("js/modernizer.min.js") !!}

</head>
<body>
<div class="account-pages"></div>
<div class="clearfix"></div>
<div class="wrapper-page">

    @yield("content")

</div>

<script>
    var resizefunc = [];
</script>

{!! Html::script("js/jquery.min.js") !!}
{!! Html::script("js/admin/app.js") !!}

</body>
</html>