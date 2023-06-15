export type CharactersListType = CharacterType [];

export type CharacterType = {
    id:       string;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
};

type Location = {
    name: string;
    url:  string;
};