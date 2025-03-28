import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { StockData } from '../data/stock-data';

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

    const stocks = StockData.stocks;

    return { contexts, stocks}; // This will simulate a `users` API endpoint
  }
}

 