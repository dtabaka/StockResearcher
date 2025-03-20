import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contexts = [
        {
            "context": "Event1",
            "event": {
              "eventTypes": [
                {
                  "eventType": "Conference"
                },
                {
                  "eventType": "Webinar"
                },
                {
                  "eventType": "Entertainment"
                }
              ],
              "keywords": [
                {
                  "keyword": "Solar Energy"
                },
                {
                  "keyword": "Safety"
                },
                {
                  "keyword": "Training"
                }
              ]
            }
          },
          {
            "context": "Event2",
            "event": {
              "eventTypes": [
                {
                  "eventType": "Seminar"
                },
                {
                  "eventType": "Workshop"
                },
                {
                  "eventType": "Networking Event"
                }
              ],
              "keywords": [
                {
                  "keyword": "Renewable Energy"
                },
                {
                  "keyword": "Workplace Safety"
                },
                {
                  "keyword": "Professional Development"
                }
              ]
            }
          }
    ];

    const stocks = [
      {
        "buy": 55,
        "hold": 25,
        "sell": 20,
        "name": "3M",
        "ticker": "MMM",
        "sector": "Producer Manufacturing",
        "industry": "Industrial Conglomerates",
        "peratio": 19.91,
        "dividendyield": 2.8,
        "rating": 9,
        "forecasthigh": 184,
        "percentagehigh": 22.02,
        "forecastmedian": 165,
        "percentagemedian": 9.42,
        "forecastlow": 96,
        "percentagelow": 36.34,
        "currentprice": 150.79
      },
      {
        "buy": 44,
        "hold": 50,
        "sell": 6,
        "name": "A. O. Smith",
        "ticker": "AOS",
        "sector": "Producer Manufacturing",
        "industry": "Building Products",
        "peratio": 18.43,
        "dividendyield": 1.91,
        "rating": 6,
        "forecasthigh": 84,
        "percentagehigh": 24.52,
        "forecastmedian": 75,
        "percentagemedian": 11.18,
        "forecastlow": 60,
        "percentagelow": 11.06,
        "currentprice": 67.46
      },
      {
        "buy": 68,
        "hold": 32,
        "sell": 0,
        "name": "Abbott Laboratories",
        "ticker": "ABT",
        "sector": "Health Technology",
        "industry": "Medical Specialties",
        "peratio": 16.59,
        "dividendyield": 1.98,
        "rating": 6,
        "forecasthigh": 160,
        "percentagehigh": 27.16,
        "forecastmedian": 135,
        "percentagemedian": 7.29,
        "forecastlow": 117,
        "percentagelow": 7.02,
        "currentprice": 125.83
      },
      {
        "buy": 68,
        "hold": 32,
        "sell": 0,
        "name": "AbbVie",
        "ticker": "ABBV",
        "sector": "Health Technology",
        "industry": "Pharmaceuticals: Major",
        "peratio": 88.6,
        "dividendyield": 3.54,
        "rating": 10,
        "forecasthigh": 251,
        "percentagehigh": 17.96,
        "forecastmedian": 215,
        "percentagemedian": 1.04,
        "forecastlow": 173,
        "percentagelow": 18.7,
        "currentprice": 212.79
      },
      {
        "buy": 68,
        "hold": 29,
        "sell": 4,
        "name": "Accenture",
        "ticker": "ACN",
        "sector": "Technology Services",
        "industry": "Information Technology Services",
        "peratio": 26.73,
        "dividendyield": 1.51,
        "rating": 10,
        "forecasthigh": 455,
        "percentagehigh": 42.05,
        "forecastmedian": 400,
        "percentagemedian": 24.88,
        "forecastlow": 320,
        "percentagelow": 0.1,
        "currentprice": 320.32
      },
      {
        "buy": 69,
        "hold": 29,
        "sell": 2,
        "name": "Adobe Inc.",
        "ticker": "ADBE",
        "sector": "Technology Services",
        "industry": "Packaged Software",
        "peratio": 25.99,
        "dividendyield": 0,
        "rating": 7,
        "forecasthigh": 703,
        "percentagehigh": 80.35,
        "forecastmedian": 528,
        "percentagemedian": 35.45,
        "forecastlow": 390,
        "percentagelow": 0.05,
        "currentprice": 389.8
      }
    ];
    

    return { contexts, stocks}; // This will simulate a `users` API endpoint
  }
}

 