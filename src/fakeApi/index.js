import { createServer } from 'miragejs';
export default function setUpSever() {
  createServer({
    routes() {
      this.get('/api/payroll', () => ({
        data: [
          {
            id: 1,
            status: 'Pending',
            date: '2022-04-22T12:30:45.000Z',
            client: 'PowerGate',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'ye5ye5ye5yuyrtujy8rhrq9234r9wqh',
          },
          {
            id: 2,
            status: 'Fulfilled',
            date: '2023-04-01T12:30:45.000Z',
            client: 'Yopmail',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'y4e5ye5ye5y5y9hwq8rhrq9234r9wqh',
          },
          {
            id: 3,
            status: 'Processing',
            date: '2023-01-22T12:30:45.000Z',
            client: 'AVB',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'y45yetry45r89hwq8rhrq9234r9wqh',
          },
          {
            id: 4,
            status: 'Received',
            date: '2023-02-12T12:30:45.000Z',
            client: 'ADIDAS',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'r23rwerwertt2twrety6r89hwq8rhrq9234r9wqh',
          },
          {
            id: 5,
            status: 'Pending',
            date: '2023-03-02T12:30:45.000Z',
            client: 'HSJKA',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'r23rerwer234r4yrh4r89hwq8rhrq9234r9wqh',
          },
          {
            id: 6,
            status: 'Received',
            date: '2022-11-12T12:30:45.000Z',
            client: 'QIYW',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: '238hf3hrwe7r4yrh23rw34r23r',
          },
          {
            id: 7,
            status: 'Pending',
            date: '2022-03-23T12:30:45.000Z',
            client: 'PowerGate',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'ye5ye5ye5yuyrtujy8rhrq9234r9wqh',
          },
          {
            id: 8,
            status: 'Fulfilled',
            date: '2023-04-22T12:30:45.000Z',
            client: 'Yopmail',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'y4e5ye5ye5y5y9hwq8rhrq9234r9wqh',
          },
          {
            id: 9,
            status: 'Processing',
            date: '2023-04-22T12:30:45.000Z',
            client: 'AVB',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'y45yetry45r89hwq8rhrq9234r9wqh',
          },
          {
            id: 10,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'ADIDAS',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'r23rwerwertt2twrety6r89hwq8rhrq9234r9wqh',
          },
          {
            id: 11,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'HSJKA',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'r23rerwer234r4yrh4r89hwq8rhrq9234r9wqh',
          },
          {
            id: 12,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'QIYW',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: '238hf3hrwe7r4yrh23rw34r23r',
          },
          {
            id: 13,
            status: 'Pending',
            date: '2023-03-24T12:30:45.000Z',
            client: 'PowerGate',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'ye5ye5ye5yuyrtujy8rhrq9234r9wqh',
          },
          {
            id: 14,
            status: 'Fulfilled',
            date: '2022-04-22T12:30:45.000Z',
            client: 'Yopmail',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'y4e5ye5ye5y5y9hwq8rhrq9234r9wqh',
          },
          {
            id: 15,
            status: 'Processing',
            date: '2022-10-22T12:30:45.000Z',
            client: 'AVB',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'y45yetry45r89hwq8rhrq9234r9wqh',
          },
          {
            id: 16,
            status: 'Received',
            date: '2022-09-22T12:30:45.000Z',
            client: 'ADIDAS',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'r23rwerwertt2twrety6r89hwq8rhrq9234r9wqh',
          },
          {
            id: 17,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'HSJKA',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'r23rerwer234r4yrh4r89hwq8rhrq9234r9wqh',
          },
          {
            id: 18,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'QIYW',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: '238hf3hrwe7r4yrh23rw34r23r',
          },
          {
            id: 19,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'PowerGate',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'ye5ye5ye5yuyrtujy8rhrq9234r9wqh',
          },
          {
            id: 20,
            status: 'Fulfilled',
            date: '2023-04-22T12:30:45.000Z',
            client: 'Yopmail',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'y4e5ye5ye5y5y9hwq8rhrq9234r9wqh',
          },
          {
            id: 21,
            status: 'Processing',
            date: '2023-04-22T12:30:45.000Z',
            client: 'AVB',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'y45yetry45r89hwq8rhrq9234r9wqh',
          },
          {
            id: 22,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'ADIDAS',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'r23rwerwertt2twrety6r89hwq8rhrq9234r9wqh',
          },
          {
            id: 23,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'HSJKA',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'r23rerwer234r4yrh4r89hwq8rhrq9234r9wqh',
          },
          {
            id: 24,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'QIYW',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: '238hf3hrwe7r4yrh23rw34r23r',
          },
          {
            id: 25,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'PowerGate',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'ye5ye5ye5yuyrtujy8rhrq9234r9wqh',
          },
          {
            id: 26,
            status: 'Fulfilled',
            date: '2023-04-22T12:30:45.000Z',
            client: 'Yopmail',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'y4e5ye5ye5y5y9hwq8rhrq9234r9wqh',
          },
          {
            id: 27,
            status: 'Processing',
            date: '2023-04-22T12:30:45.000Z',
            client: 'AVB',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'y45yetry45r89hwq8rhrq9234r9wqh',
          },
          {
            id: 28,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'ADIDAS',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: 'r23rwerwertt2twrety6r89hwq8rhrq9234r9wqh',
          },
          {
            id: 29,
            status: 'Pending',
            date: '2023-04-22T12:30:45.000Z',
            client: 'HSJKA',
            currentcy: 'USD',
            tolal: 2300,
            invoice: 'r23rerwer234r4yrh4r89hwq8rhrq9234r9wqh',
          },
          {
            id: 30,
            status: 'Received',
            date: '2023-04-22T12:30:45.000Z',
            client: 'QIYW',
            currentcy: 'EUR',
            tolal: 2300,
            invoice: '238hf3hrwe7r4yrh23rw34r23r',
          },
        ],
      }));
    },
  });
}
