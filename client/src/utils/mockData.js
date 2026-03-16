export const mockPosts = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'johndoe',
    },
    content: 'test!',
    createdAt: '2026-03-07T10:00:00Z',
    likes: 14,
    comments: [
      { id: 'c1', username: 'janedoe', text: 'That is awesome!' },
      { id: 'c2', username: 'bobsmith', text: 'great, congrats!' }
    ]
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'janedoe',
    },
    content: 'testing again!.',
    createdAt: '2026-03-07T08:30:00Z',
    likes: 8,
    comments: [
      { id: 'c3', username: 'johndoe', text: 'AI changed everything!' }
    ]
  },
  {
    id: '3',
    author: {
      id: 'user3',
      username: 'bobsmith',
    },
    content: 'time to learn',
    createdAt: '2026-03-06T20:00:00Z',
    likes: 22,
    comments: []
  }
]

export const mockUser = {
  id: 'user1',
  username: 'johndoe',
  email: 'johndoe@example.com',
  bio: 'Full stack developer in training.',
  followersCount: 42,
  followingCount: 18,
  createdAt: '2026-01-01T00:00:00Z'
}