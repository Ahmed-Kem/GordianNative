interface Contact {
  id: string;
  name: string;
  color: string;
  tags: string[];
  photoUrl: string;
}

interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
  photoUrl: string;
  contacts: string[];
}
