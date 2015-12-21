"""
Creates a cron job that will update the database every month with new planets and stars.
"""
from django.conf import settings
from django_cron import CronJobBase, Schedule

import kplr
import math
import random
from kepler_exoplanets.models import Star, Planet

class AddNewKeplerData(CronJobBase):
    # Equal to one month in minutes
    RUN_EVERY_MINS = 43800

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'cron.AddNewKeplerData'

    def do(self):
        print("Fetching Kepler data")
        client = kplr.API()
        planets = client.planets()

        print("Attempting to add new planets...")
        for planet in planets:
            try:
                existing_star = Star.objects.get(star_designation=planet.tm_designation)
                star_id = existing_star.id
            except Star.DoesNotExist:
                current_star = Star(
                star_designation = planet.tm_designation,
                right_ascension = planet.degree_ra,
                declination = planet.degree_dec,
                stellar_temp = planet.koi_steff,
                stellar_radius = planet.koi_srad,
                stellar_mass = planet.koi_smass,
                light_years_dist = round(3000 * math.sqrt(random.uniform(0.028,1)))
                )
                current_star.save()
                star_id = current_star.id
            try:
                existing_planet = Planet.objects.get(kepler_name = planet.kepler_name)
            except Planet.DoesNotExist:
                current_planet = Planet(
                star_id = star_id,
                kepler_name = planet.kepler_name,
                koi_name = planet.kepoi_name,
                kepler_id = planet.kepid,
                planet_radius = planet.koi_prad,
                surface_temp = planet.koi_teq,
                inclination = planet.koi_incl,
                semimajor_axis = planet.koi_sma,
                orbital_period = planet.koi_period,
                transits_observed = planet.koi_num_transits,
                ingress_duration = planet.koi_ingress,
                transit_duration = planet.koi_duration,
                transit_depth = planet.koi_depth,
                )
                current_planet.save()
                print("Added planet {name}".format(name=planet.kepler_name))
