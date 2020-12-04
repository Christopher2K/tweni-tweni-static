declare namespace Model {
  interface PhotoWithCaption {
    url: string
    caption: string
  }

  interface Genesis {
    contact: string
    mainText: string
    team: string[]
    credits: string[]
  }

  interface Inspiration {
    enabled: boolean
    id: string
    title: string
    artist: string
    date: string
    subject: string
    color: string
    categories: string[]
    carousel: PhotoWithCaption[]
    description: string
  }

  interface Article {
    uid: string
    title: string
    subtitle: string
    date: string
    thumbnailPhoto: string
    coverPhoto: string
    author: string
    categories: string[]
    content: string
  }

  interface Mix {
    id: string
    title: string
    author: string
    thumbnailPhoto: string
    url: string
  }
}
