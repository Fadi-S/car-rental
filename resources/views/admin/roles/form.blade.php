<div class="form-group {{ ($errors->has("name")) ? " has-error" : "" }}">
    {!! Form::label("name","Name *") !!}
    {!! Form::text("name", null, ['class'=>'form-control', 'required']) !!}
</div>

<style>
    .permissions-select {
        text-align: center;
    }

    .permissions-group {
        background-color: #dae2f2;
        border-radius: 30px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        margin: 15px 15px 10px 15px;
        width: 25%;
        display:inline-block;
        vertical-align: middle;
    }

    @media (max-width: 600px) {
        .permissions-group {
            width: 95%;
        }
    }

    @media (min-width: 600px) and (max-width: 720px) {
        .permissions-group {
            width: 40%;
        }
    }

    .permissions-title {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        -moz-border-radius-topleft: 20px;
        -moz-border-radius-topright: 20px;
        -webkit-border-top-right-radius: 20px;
        -webkit-border-top-left-radius: 20px;
        padding: 5px 0 5px 0;
        color: white;
        font-size: 110%;
        background-color: #6872a7;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
    }

    .permissions-holder {
        padding-left: 10px;
        padding-bottom: 15px;
    }

    .permission {
        margin: 8px;
    }
</style>

<section class="permissions-select">
    @foreach($groups as $group)
        @if($admin->hasPermissionGroup($group->group))
            <div class="permissions-group">
                <div class="permissions-title">{{ $group->group }}</div>
                <div class="permissions-holder">
                    @foreach(\App\Models\Permission\Permission::permissionsByGroup($group->group) as $permission)
                        @if($admin->hasPermission($permission->name))
                            <div class="permission">
                                <div class="peer">
                                    <div class="checkbox checkbox-rectangle checkbox-info peers ai-c">
                                        {!! Form::checkbox("permissions[]", $permission->id, null, ['class'=>'peer', "id"=>$permission->name]) !!}
                                        {!! Form::label($permission->name, $permission->label, ['class'=>'peers peer-greed js-sb ai-c']) !!}
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        @endif
    @endforeach
</section>

<script>
    var maxH = 0;
    var panel_headings = $(".permissions-group");
    $(window).on("load resize", function() {
        panel_headings.each(function () {
            var totalHeight = 0;
            $(this).children().each(function () {
                totalHeight = totalHeight + $(this).outerHeight(true);
            });
            if (totalHeight > maxH)
                maxH = totalHeight;
        });
        panel_headings.css('min-height', maxH);
    });
</script>

<div class="form-group">
    <center>{!! Form::submit($submit, ['class'=>'btn btn-success']) !!}</center>
</div>

@include("errorList")