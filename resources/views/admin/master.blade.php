<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @yield("title")

    {!! Html::style("css/admin/app.css") !!}
    @yield("plugins.css")

    {!! Html::script("js/modernizr.min.js") !!}

    {!! Html::script("js/jquery.min.js") !!}
</head>


<body class="fixed-left">

<!-- Begin page -->
<div id="wrapper">

    <!-- Top Bar Start -->
    <div class="topbar">

        <!-- LOGO -->
        <div class="topbar-left">
            <div class="text-center">
                <a href="{{ url($adminUrl) }}" class="logo"><i class="icon-magnet icon-c-logo"></i><span>Car Rental</span></a>
            </div>
        </div>

        <!-- Button mobile view to collapse sidebar menu -->
        <div class="navbar navbar-default" role="navigation">
            <div class="container">
                <div class="">
                    <div class="pull-left">
                        <button class="button-menu-mobile open-left waves-effect waves-light">
                            <i class="md md-menu"></i>
                        </button>
                        <span class="clearfix"></span>
                    </div>

                    <ul class="nav navbar-nav navbar-right pull-right">
                        <li class="dropdown top-menu-item-xs">
                            <a href="" class="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="true"><img src="{{ $currentAdmin->picture }}" alt="user-img" class="img-circle"> </a>
                            <ul class="dropdown-menu">
                                <li><a href="{{ url("$adminUrl/admins/$currentAdmin->username") }}"><i class="ti-user m-r-10 text-custom"></i> Profile</a></li>
                                <li><a href="{{ url("$adminUrl/change-password/") }}"><i class="ti-user m-r-10 text-custom"></i> Change password</a></li>
                                <li class="divider"></li>
                                <li>
                                    <a href="{{ url($adminUrl.'/logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <span class="fa fa-power-off"></span> Logout
                                    </a>
                                    <form id="logout-form" method="POST" action="{{ url($adminUrl.'/logout') }}" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </div>
    </div>
    <!-- Top Bar End -->


    <!-- ========== Left Sidebar Start ========== -->

    <div class="left side-menu">
        <div class="sidebar-inner slimscrollleft">
            <!--- Divider -->
            <div id="sidebar-menu">
                <ul>

                    <li class="text-muted menu-title">Navigation</li>

                    <li>
                        <a href="{{ url($adminUrl) }}" class="waves-effect"><i class="ti-home"></i> <span> Dashboard </span></a>
                    </li>

                    @if($currentAdmin->hasPermissionGroup("Clients"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-users"></i> <span> Clients </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @if($currentAdmin->hasPermission("add_client"))
                                    <li><a href="{{ url("$adminUrl/clients/create") }}">Create Client</a></li>
                                @endif

                                @if($currentAdmin->hasPermission("view_client"))
                                    <li><a href="{{ url("$adminUrl/clients") }}">All Clients</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Admins"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-user-secret"></i> <span> Admins </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @if($currentAdmin->hasPermission("add_admin"))
                                    <li><a href="{{ url("$adminUrl/admins/create") }}">Create Admin</a></li>
                                @endif

                                @if($currentAdmin->hasPermission("view_admin"))
                                    <li><a href="{{ url("$adminUrl/admins") }}">All Admins</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Cars"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-car"></i> <span> Cars </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @if($currentAdmin->hasPermission("add_car"))
                                    <li><a href="{{ url("$adminUrl/cars/create") }}">Create Car</a></li>
                                @endif

                                @if($currentAdmin->hasPermission("view_car"))
                                    <li><a href="{{ url("$adminUrl/cars") }}">All Cars</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Roles"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-cogs"></i> <span> Roles </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @if($currentAdmin->hasPermission("add_role"))
                                    <li><a href="{{ url("$adminUrl/roles/create") }}">Create Role</a></li>
                                @endif

                                @if($currentAdmin->hasPermission("view_role"))
                                    <li><a href="{{ url("$adminUrl/roles") }}">All Roles</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
    <!-- Left Sidebar End -->

    <div class="content-page">
        <!-- Start content -->
        <div class="content">
            <div class="container">

                @yield("content")
                @include("flash")

            </div> <!-- container -->

        </div> <!-- content -->

    </div>

</div>

<script>
    var resizefunc = [];
</script>

{!! Html::script("js/admin/app.js") !!}
@yield("plugins.js")

<script type="text/javascript">
    jQuery(document).ready(function($) {
        $('.counter').counterUp({
            delay: 100,
            time: 1200
        });

        $(".knob").knob();

    });
</script>




</body>
</html>