import { RequestedOffer } from '../lib/interfaces';

export const demands: RequestedOffer[] = [
  {
    id: '1',
    offer: {
      id: '1',
      title: 'Offer 1',
      description: 'Offer 1 description',
      image: 'https://picsum.photos/200/300',
    },
    user: {
      id: '1',
      name: 'User 1',
    },
    status: 'pending',
  },
  {
    id: '2',
    offer: {
      id: '2',
      title: 'Offer 2',
      description: 'Offer 2 description',
      image: 'https://picsum.photos/200/300',
    },
    user: {
      id: '2',
      name: 'User 2',
    },
    status: 'pending',
  },
];
