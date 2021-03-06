# Flask imports
from flask import Blueprint, render_template, url_for, current_app
import json
import requests
from bs4 import BeautifulSoup
import urllib.request as request

# Dash Blueprint Creation
tab3_bp = Blueprint('tab3_bp', __name__,
    template_folder='templates',
    static_folder='static/tab3')

country_codes = {
"Afghanistan" 	:"AF",
"Albania"	:"AL", 
"Algeria"	:"DZ", 
"American Samoa" 	:"AS", 
"Andorra" 	:"AD", 
"Angola" 	:"AO", 
"Anguilla" 	:"AI", 
"Antarctica" 	:"AQ", 
"Antigua and Barbuda"	:"AG", 
"Argentina"	:"AR", 
"Armenia" 	:"AM", 
"Aruba" 	:"AW", 
"Australia" :"AU", 
"Austria"	:"AT", 
"Azerbaijan":"AZ", 
"Bahamas" 	:"BS", 
"Bahrain" 	:"BH", 
"Bangladesh":"BD", 
"Barbados" 	:"BB", 
"Belarus" 	:"BY", 
"Belgium" 	:"BE", 
"Belize" 	:"BZ", 
"Benin" 	:"BJ", 
"Bermuda" 	:"BM", 
"Bhutan" 	:"BT", 
"Bolivia": 	"BO", 
"Bonaire Sint Eustatius and Saba": 	"BQ", 
"Bosnia and Herzegovina": 	"BA", 
"Botswana": 	"BW", 
"Bouvet Island": 	"BV", 
"Brazil": 	"BR", 
"British Indian Ocean Territory": 	"IO",
"British Virgin Islands": 	"VG",
"Brunei Darussalam": 	"BN", 
"Bulgaria": 	"BG", 
"Burkina Faso": 	"BF", 
"Burundi": 	"BI",
"Cambodia": 	"KH", 
"Cameroon": 	"CM", 
"Canada": 	"CA", 
"Cape Verde": "CV", 
"Cayman Islands": 	"KY", 
"Central African Republic": 	"CF", 
"Chad": 	"TD", 
"Chile": 	"CL", 
"China": 	"CN", 
"Christmas Island": 	"CX", 
"Cocos (Keeling) Islands": 	"CC", 
"Colombia": 	"CO", 
"Comoros": 	"KM", 
"Congo (Kinshasa)": 	"CD",
"Congo (Brazzaville)": 	"CG",
"Cook Islands": 	"CK",
"Costa Rica": 	"CR",
"Croatia": 	"HR",
"Cuba": 	"CU",
"Curaçao": 	"CW",
"Cyprus": 	"CY",
"Czech Republic": 	"CZ",
"Côte d'Ivoire": 	"CI",
"Denmark": 	"DK",
"Djibouti": 	"DJ",
"Dominica": 	"DM",
"Dominican Republic": 	"DO",
"Ecuador": 	"EC",
"Egypt": 	"EG",
"El Salvador": 	"SV",
"Equatorial Guinea": 	"GQ",
"Eritrea": 	"ER",
"Estonia": 	"EE",
"Eswatini": 	"SZ",
"Ethiopia": 	"ET",
"Falkland Islands (Malvinas)": 	"FK",
"Faroe Islands": "FO",
"Fiji": 	"FJ",
"Finland": 	"FI",
"France": 	"FR", 
"French Guiana": 	"GF", 
"French Polynesia": 	"PF", 
"French Southern Territories": 	"TF", 
"Gabon" :	"GA", 
"Gambia" :	"GM", 
"Georgia" :	"GE", 
"Germany" :	"DE", 
"Ghana" :	"GH", 
"Gibraltar" :	"GI", 
"Greece" :	"GR", 
"Greenland" :	"GL", 
"Grenada" :	"GD", 
"Guadeloupe" :	"GP", 
"Guam" :	"GU",
"Guatemala" :	"GT",
"Guernsey" :	"GG", 
"Guinea" :	"GN", 
"Guinea-Bissau" :	"GW", 
"Guyana" :	"GY", 
"Haiti" :	"HT", 
"Heard and Mcdonald Islands" :	"HM", 
"Holy See (the)" :	"VA", 
"Honduras" :	"HN", 
"Hong Kong, SAR China" :	"HK", 
"Hungary" :	"HU", 
"Iceland" :	"IS", 
"India" :	"IN", 	
"Indonesia" :	"ID", 
"Iran, Islamic Republic of" :	"IR", 
"Iraq" :	"IQ", 
"Ireland" :	"IE", 
"Isle of Man" :	"IM", 
"Israel" :	"IL", 
"Italy" :	"IT", 
"Jamaica" :	"JM", 
"Japan" :	"JP", 
"Jersey" :	"JE", 
"Jordan" :	"JO", 
"Kazakhstan" :	"KZ", 
"Kenya" :	"KE", 
"Kiribati" :	"KI", 
"Korea (North)" :	"KP", 
"Korea (South)" :	"KR", 
"Kuwait" :	"KW", 
"Kyrgyzstan" :	"KG", 
"Lao PDR" :	"LA", 
"Latvia" :	"LV", 
"Lebanon" :	"LB", 
"Lesotho" :	"LS", 
"Liberia" :	"LR", 
"Libya" :	"LY", 
"Liechtenstein" :	"LI",
"Lithuania" :	"LT", 
"Luxembourg" :	"LU", 
"Macao, SAR China" :	"MO", 
"Macedonia, Republic of" :	"MK", 
"Madagascar" :	"MG", 
"Malawi" :	"MW", 
"Malaysia" :	"MY", 
"Maldives" :	"MV", 
"Mali" :	"ML", 
"Malta" :	"MT", 
"Marshall Islands" :	"MH", 
"Martinique" :	"MQ", 
"Mauritania" :	"MR", 
"Mauritius" :	"MU", 
"Mayotte" :	"YT", 
"Mexico" :	"MX", 
"Micronesia, Federated States of" :	"FM", 
"Moldova" :	"MD", 
"Monaco" :	"MC", 
"Mongolia" :	"MN", 
"Montenegro" :	"ME", 
"Montserrat" :	"MS", 
"Morocco" :	"MA", 
"Mozambique" :	"MZ", 
"Myanmar" :	"MM", 
"Namibia" :	"NA", 
"Nauru" :	"NR", 
"Nepal" :	"NP", 
"Netherlands Antilles" :	"NL", 
"New Caledonia" :	"NC", 
"New Zealand" :	"NZ", 
"Nicaragua" :	"NI", 
"Niger" :	"NE", 
"Nigeria" :	"NG", 
"Niue" :	"NU", 
"Norfolk Island" :	"NF", 
"Northern Mariana Islands" :	"MP",
"Norway" :	"NO", 
"Oman" :	"OM", 
"Pakistan" :	"PK", 
"Palau" :	"PW",
"Palestinian Territory" :	"PS", 
"Panama" :	"PA", 
"Papua New Guinea" :	"PG", 
"Paraguay" :	"PY", 
"Peru" :	"PE", 
"Philippines" :	"PH", 
"Pitcairn" :	"PN", 
"Poland" :	"PL", 
"Portugal" :	"PT", 
"Puerto Rico"	:"PR", 
"Qatar" :	"QA",	
"Romania" :	"RO", 
"Republic of Kosovo" :	"XK", 
"Russian Federation" :	"RU", 
"Rwanda" :	"RW", 
"Réunion" :	"RE", 
"Saint-Barthélemy" :	"BL", 
"Saint Helena" :	"SH", 
"Saint Kitts and Nevis" :	"KN", 
"Saint Lucia" :	"LC", 
"Saint-Martin (French part)" :	"MF", 
"Saint Pierre and Miquelon" :	"PM", 
"Saint Vincent and Grenadines" :	"VC", 
"Samoa" :	"WS", 
"San Marino" :	"SM", 	
"Sao Tome and Principe" :	"ST", 	
"Saudi Arabia" :	"SA", 
"Senegal" :	"SN", 
"Serbia" :	"RS", 
"Seychelles" :	"SC", 
"Sierra Leone" :	"SL", 
"Singapore" :	"SG", 
"Sint Maarten (Dutch part)" :	"SX", 
"Slovakia" :	"SK", 	
"Slovenia" :	"SI", 	
"Solomon Islands" :	"SB", 	
"Somalia" :	"SO", 	
"South Africa" :	"ZA", 	
"South Georgia and the South Sandwich Islands" :	"GS", 	
"South Sudan" :	"SS", 	
"Spain" :	"ES", 	
"Sri Lanka" :	"LK", 	
"Sudan" :	"SD", 	
"Suriname" :	"SR", 	
"Svalbard and Jan Mayen Islands" :	"SJ", 	
"Sweden" :	"SE", 	
"Swaziland" :	"SZ", 	
"Switzerland" :	"CH", 	
"Syrian Arab Republic (Syria)" :	"SY", 	
"Taiwan, Republic of China" :	"TW", 	
"Tajikistan" :	"TJ", 	
"Tanzania, United Republic of" :	"TZ", 	
"Thailand" :	"TH", 	
"Timor-Leste" :	"TL", 	
"Togo" :	"TG", 	
"Tokelau" :	"TK", 	
"Tonga" :	"TO", 	
"Trinidad and Tobago" :	"TT", 	
"Tunisia" :	"TN", 	
"Turkey" :	"TR", 	
"Turkmenistan" :	"TM", 	
"Turks and Caicos Islands" :	"TC", 	
"Tuvalu" :	"TV", 	
"Uganda" :	"UG", 	
"Ukraine" :	"UA", 	
"United Arab Emirates" :"AE", 	
"United Kingdom of Great Britain and Northern Ireland" :	"GB", 	
"US Minor Outlying Islands" :	"UM", 	
"United States of America" :	"US", 	
"United Kingdom" :	"GB", 	
"Uruguay" :	"UY", 	
"Uzbekistan" :	"UZ", 	
"Vanuatu" :	"VU", 	
"Venezuela (Bolivarian Republic)" :	"VE", 	
"Viet Nam" :	"VN", 	
"Virgin Islands (British)" :	"VG", 	
"Virgin Islands, US" :	"VI", 	
"Wallis and Futuna Islands" :	"WF", 	
"Western Sahara" :	"EH", 	
"Yemen" :	"YE", 	
"Zambia" :	"ZM", 	
"Zimbabwe" :	"ZW", 	
"ALA Aland Islands" :	"AX"
}


# Dash Blueprint Routes
@tab3_bp.route('/assist')
def index():

     # Covid all/summary Urls
    getUrlAll = "https://api.covid19api.com/all"
    getUrlSum = "https://api.covid19api.com/summary"
    donateUrl = "https://www.cnn.com/interactive/2020/health/coronavirus-how-to-help/"

    page = requests.get(donateUrl)

 
    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find_all(class_="cnnix__article__paragraph")
    
    donation_dict = {}
    donation_group = []
    donation_heading = ''
    counter = 0
    donation_header_ids = {
        "Arts and culture": "arts",
        "Seniors and people with disabilities": "seniors",
        "Meals and food support": "food",
        "Homeless communities": "homeless",
        "Medical efforts": "medical",
        "Mental health": "mental",
        "Refugees and international relief": "refugees",
        "Restaurants and food workers": "restuarants",
        "Service workers": "service",
        "Small businesses": "business"
    }

    links = []

    for x in results:
        if x.h2:
            if counter > 0:
                donation_dict[donation_heading] = donation_group
                donation_group = []
                donation_heading = x.h2.text
                counter = 0
            else:
                donation_heading = x.h2.text
            counter+=1
        if x.p and x.p != "":
            if x.a:
                donation_group.append([x.p.text, x.a['href']])
            else:
                donation_group.append(x.p.text)
    
    response_sum = requests.get(getUrlSum)
    sum_data = json.loads(response_sum.text)
    
    return render_template('tab3/tab3.html', data = sum_data, cc = country_codes, donation_dict = donation_dict, donation_header_ids=donation_header_ids)