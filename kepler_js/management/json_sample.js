import json

response = []
for row in z['rows']:
    for key, dict_list in row.iteritems():
        count = dict_list[1]
        year = dict_list[2]
        response.append({'count': count['v'], 'year' : year['v']})

 print json.dumps(response)

{
star: 1,
orbital_period: 10.558,
transit_duration: 3.374,
koi_name: "K01931.02",
semimajor_axis: 0.09,
id: 1,
kepler_id: 10978763,
habitable: false,
surface_temp: 742,
transit_depth: 209.4,
inclination: 89.38,
planet_radius: 1.16,
ingress_duration: null,
kepler_name: "Kepler-339 d",
transits_observed: 120
}
