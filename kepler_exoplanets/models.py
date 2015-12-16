from django.db import models

class Star(models.Model):
    # Star has many planets
    star_designation = models.CharField(max_length=100)
    right_ascension = models.FloatField(null=True, blank=True)
    declination = models.FloatField(null=True, blank=True)
    stellar_temp = models.IntegerField(null=True, blank=True)
    stellar_radius = models.FloatField(null=True, blank=True)
    stellar_mass = models.FloatField(null=True, blank=True)
    light_years_dist = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.star_designation

class Planet(models.Model):
    # Planet belongs to a Star
    star = models.ForeignKey('kepler_exoplanets.Star', related_name="planets")
    kepler_name = models.CharField(max_length=100)
    koi_name = models.CharField(max_length=100)
    kepler_id = models.IntegerField(null=True, blank=False)
    planet_radius = models.FloatField(null=True, blank=True)
    surface_temp = models.IntegerField(null=True, blank=True)
    inclination = models.FloatField(null=True, blank=True)
    semimajor_axis = models.FloatField(null=True, blank=True)
    orbital_period = models.FloatField(null=True, blank=True)
    transits_observed = models.IntegerField(null=True, blank=True)
    ingress_duration = models.FloatField(null=True, blank=True)
    transit_duration = models.FloatField(null=True, blank=True)
    transit_depth = models.FloatField(null=True, blank=True)
    habitable = models.BooleanField(default=False)

    def __str__(self):
        return self.kepler_name
