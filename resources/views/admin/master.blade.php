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
                        @can("activity_admin")
                            <li class="hidden-xs">
                                <a href="{{ url("$adminUrl/admins/activity") }}" class="waves-effect waves-light"><i class="fa fa-history"></i></a>
                            </li>
                        @endcan

                        <li class="dropdown top-menu-item-xs">
                            <a href="" class="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="true"><img src="{{ $currentAdmin->picture }}" alt="user-img" class="img-circle"> </a>
                            <ul class="dropdown-menu">
                                <li><a href="{{ url("$adminUrl/admins/$currentAdmin->username") }}"><i class="ti-user m-r-10 text-custom"></i> Profile</a></li>
                                <li><a href="{{ url("$adminUrl/change-password/") }}"><i class="ti-pencil m-r-10 text-custom"></i> Change password</a></li>
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

                <div class="row">
                    <img class="img-circle" src="{{ $currentAdmin->picture }}" width="70" height="70">
                    <span class="a">{{ $currentAdmin->name }}</span>
                </div>

                <ul>

                    <li class="text-muted menu-title">Navigation</li>

                    <li>
                        <a href="{{ url($adminUrl) }}" class="waves-effect"><i class="ti-home"></i> <span> Dashboard </span></a>
                    </li>

                    @if($currentAdmin->hasPermissionGroup("Clients"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-users"></i> <span> Clients </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @can("add_client")
                                    <li><a href="{{ url("$adminUrl/clients/create") }}">Create Client</a></li>
                                @endcan

                                @can("view_client")
                                    <li><a href="{{ url("$adminUrl/clients") }}">All Clients</a></li>
                                @endcan

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Admins"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-user-secret"></i> <span> Admins </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @can("add_admin")
                                    <li><a href="{{ url("$adminUrl/admins/create") }}">Create Admin</a></li>
                                @endcan

                                @can("view_admin")
                                    <li><a href="{{ url("$adminUrl/admins") }}">All Admins</a></li>
                                @endcan

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Cars"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-car"></i> <span> Cars </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">

                                @can("add_car")
                                    <li class="has_sub">
                                        <a href="javascript:void(0);" class="waves-effect"><span>Categories</span>  <span class="menu-arrow"></span></a>
                                        <ul style="">
                                            <li><a href="{{ url("$adminUrl/categories/create") }}"><span>Create Category</span></a></li>
                                            <li><a href="{{ url("$adminUrl/categories") }}"><span>All Categories</span></a></li>
                                        </ul>
                                    </li>

                                    <li class="has_sub">
                                        <a href="javascript:void(0);" class="waves-effect"><span>Editions</span>  <span class="menu-arrow"></span></a>
                                        <ul style="">
                                            <li><a href="{{ url("$adminUrl/editions/create") }}"><span>Create Edition</span></a></li>
                                            <li><a href="{{ url("$adminUrl/editions") }}"><span>All Editions</span></a></li>
                                        </ul>
                                    </li>

                                    <li class="has_sub">
                                        <a href="javascript:void(0);" class="waves-effect"><span>Types</span>  <span class="menu-arrow"></span></a>
                                        <ul style="">
                                            <li><a href="{{ url("$adminUrl/types/create") }}"><span>Create Type</span></a></li>
                                            <li><a href="{{ url("$adminUrl/types") }}"><span>All Types</span></a></li>
                                        </ul>
                                    </li>

                                    <li class="has_sub">
                                        <a href="javascript:void(0);" class="waves-effect"><span>Octanes</span>  <span class="menu-arrow"></span></a>
                                        <ul style="">
                                            <li><a href="{{ url("$adminUrl/octanes/create") }}"><span>Create Octane</span></a></li>
                                            <li><a href="{{ url("$adminUrl/octanes") }}"><span>All Octanes</span></a></li>
                                        </ul>
                                    </li>

                                    <li><a href="{{ url("$adminUrl/cars/create") }}">Create Car</a></li>
                                @endcan

                                @can("view_car")
                                    <li><a href="{{ url("$adminUrl/cars") }}">All Cars</a></li>
                                @endcan

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Admins") || $currentAdmin->hasPermissionGroup("Cars") || $currentAdmin->hasPermissionGroup("Clients"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-map-marker"></i> <span> Locations </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @if($currentAdmin->can("add_admin") || $currentAdmin->can("add_car") || $currentAdmin->can("add_client"))
                                    <li><a href="{{ url("$adminUrl/locations/create") }}">Create Locations</a></li>
                                @endif

                                @if($currentAdmin->can("view_admin") || $currentAdmin->can("view_car") || $currentAdmin->can("view_calint"))
                                    <li><a href="{{ url("$adminUrl/locations") }}">All Locations</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                    @if($currentAdmin->hasPermissionGroup("Roles"))
                        <li class="has_sub">
                            <a href="javascript:void(0);" class="waves-effect"><i class="fa fa-cogs"></i> <span> Roles </span> <span class="menu-arrow"></span> </a>
                            <ul class="list-unstyled">
                                @can("add_role")
                                    <li><a href="{{ url("$adminUrl/roles/create") }}">Create Role</a></li>
                                @endcan

                                @can("view_role")
                                    <li><a href="{{ url("$adminUrl/roles") }}">All Roles</a></li>
                                @endcan

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