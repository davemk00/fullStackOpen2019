const listHelper = require('../utils/list_helper')



const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyblogs = [
  {
    // _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    // _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    // _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    // _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    // _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    // _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blog equals total likes', () => {
    const result = listHelper.totalLikes(listWithManyblogs)
    expect(result).toBe(36)
  })
})

describe('likes stats', () => {
  test('when list has many blog maximum likes', () => {
    const result = listHelper.maxLikes(listWithManyblogs)
    expect(result).toBe(12)
  })
  test('when list has many blog maximum likes', () => {
    const result = listHelper.minLikes(listWithManyblogs)
    expect(result).toBe(0)
  })
})

describe('blog details', () => {
  test('when list has many blog maximum likes RETURN favoriteBlog details', () => {
    const result = listHelper.favoriteBlog(listWithManyblogs)
    expect(result).toBe(listWithManyblogs[2])
  })

  test('when list has many blogs RETURN author with most blogs details', () => {
    const result = listHelper.favoriteBlogger(listWithManyblogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })

  test('when list has many blogs RETURN author with most blogs details', () => {
    const result = listHelper.mostLikedBlogger(listWithManyblogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})
  
