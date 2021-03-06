Game.objects.weapons.AirShooter = function()
{
    Game.objects.Weapon.call(this);
    this.speed = 80;
}

Game.objects.weapons.AirShooter.prototype = Object.create(Game.objects.Weapon.prototype);
Game.objects.weapons.AirShooter.constructor = Game.objects.Weapon;

Game.objects.weapons.AirShooter.prototype.fire = function()
{
    if (!Game.objects.Weapon.prototype.fire.call(this)) {
        return false;
    }

    var velocityMultiplier = 1.2;
    var count = 0;
    var projectile;
    while (projectile = this.getProjectile()) {
        projectile.speed = this.speed * Math.pow(velocityMultiplier, count++);
        this.emit(projectile);
    }

    return true;
}
