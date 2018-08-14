<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models\Admin{
/**
 * App\Models\Admin\Admin
 *
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Admin\Admin onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Admin\Admin withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Admin\Admin withoutTrashed()
 */
	class Admin extends \Eloquent {}
}

namespace App\Models\Car{
/**
 * App\Models\Car\Car
 *
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Car\Car onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Car\Car withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Car\Car withoutTrashed()
 */
	class Car extends \Eloquent {}
}

namespace App\Models\CarCategory{
/**
 * App\Models\CarCategory\CarCategory
 *
 */
	class CarCategory extends \Eloquent {}
}

namespace App\Models\CarEdition{
/**
 * App\Models\CarEdition\CarEdition
 *
 */
	class CarEdition extends \Eloquent {}
}

namespace App\Models\CarOctane{
/**
 * App\Models\CarOctane\CarOctane
 *
 */
	class CarOctane extends \Eloquent {}
}

namespace App\Models\CarType{
/**
 * App\Models\CarType\CarType
 *
 */
	class CarType extends \Eloquent {}
}

namespace App\Models\Client{
/**
 * App\Models\Client\Client
 *
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Client\Client onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Client\Client withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Client\Client withoutTrashed()
 */
	class Client extends \Eloquent {}
}

namespace App\Models\ClientArea{
/**
 * App\Models\ClientArea\ClientArea
 *
 */
	class ClientArea extends \Eloquent {}
}

namespace App\Models\Location{
/**
 * App\Models\Location\Location
 *
 */
	class Location extends \Eloquent {}
}

namespace App\Models\Permission{
/**
 * App\Models\Permission\Permission
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role\Role[] $roles
 */
	class Permission extends \Eloquent {}
}

namespace App\Models\Role{
/**
 * App\Models\Role\Role
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Admin\Admin[] $admins
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission\Permission[] $permissions
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Role\Role onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Role\Role withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Role\Role withoutTrashed()
 */
	class Role extends \Eloquent {}
}

