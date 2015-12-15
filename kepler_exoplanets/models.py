from django.db import models

class Star(models.Model):
    # Star has many planets
    star_designation = models.CharField(max_length=100)
    right_ascension = models.FloatField()
    declination = models.FloatField()
    stellar_temp = models.IntegerField()
    stellar_radius = models.FloatField()
    stellar_mass = models.FloatField()
    light_years_dist = models.IntegerField()

    def __str__(self):
        return self.star_designation

class Planet(models.Model):
   # Planet belongs to a Star
    star = models.ForeignKey('kepler_exoplanets.Star')
    kepler_name = models.CharField(max_length=100)
    koi_name = models.CharField(max_length=100)
    kepler_id = models.IntegerField()
    planet_radius = models.FloatField()
    surface_temp = models.IntegerField()
    inclination = models.FloatField()
    semimajor_axis = models.FloatField()
    orbital_period = models.FloatField()
    transits_observed = models.IntegerField()
    ingress_duration = models.FloatField()
    transit_duration = models.FloatField()
    transit_depth = models.FloatField()
    habitable = models.BooleanField(default=False)

    def __str__(self):
        return self.kepler_name
