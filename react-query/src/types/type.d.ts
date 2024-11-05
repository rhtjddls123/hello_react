interface EventType {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
}

interface InputDataType {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
}

interface ImageType {
  path: string;
  caption: string;
}
