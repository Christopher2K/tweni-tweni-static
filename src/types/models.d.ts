declare namespace Model {
  interface PhotoWithCaption {
    url: string
    caption: string
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
}
