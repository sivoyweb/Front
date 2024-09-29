
export interface ILogin {
    email: string;
    password: string;
  }

  export interface IRegister{
    name: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string,
  }

  export interface IRegisterGoogle{
    name: string,
    token:string,
    email: string,
    phone: string,
  }

  export interface IDisability{
    id: string,
    name: string,
    category: string,
    user: IUser,
  }

  export interface IDonation{
    id: string,
    user: IUser,
    mount: number,
    date: Date,
    description: string,
  }

  export interface IloginGoogle{
    name:string
    token:string
    phone:string
    email:string
  }

  export interface ISuggestion{
    id: string,
    user: IUser,
    name: string,
    country: string,
    city: string,
    date: Date,
    price: number,
    description: string,
    typeService: string,
    accesibilitySeal: string,
    imagesUrl: IImage[],
    state: boolean,
  }


  export interface IRole{

  }
  export interface IUserChange{
    name:string
    email:string
    phone:string
    password:string
    avatar:string
    disability:IDisability
    id:string
  }



  export interface IUser{
    id?: string,
    name: string,
    role: IRole,
    disabilities: IDisability[],
    phone: number,
    createdAt: Date,
    auth: boolean,
    cascade: true,
    credential: ICredential,
    reviews: IReview[],
    donations: IDonation[],
    suggestions: ISuggestion[],
    history: ITravel[],
    block: boolean,
    email: string,
    password: string,
    confirmPassword: string,
  }

export interface ICredential {
  id: string,
  email: string,
  password: string,
  avatar: IImage,
  user: IUser,
}

export interface IImage {
  id: string,
  url: string,
  publicId: string,
}

export interface IImageBlog {
  id: string,
  url: string,
  publicId: string,
}

export interface ITravelProvider {
  id: string,
  travel: ITravel;
  provider: IProvider;
}

export interface IProvider {
  id: string,
  name: string;
  description: string;
  travelProviders: ITravelProvider[];
  }

  export interface IReviewGet {
    id: string;
    user: IUser;
    travel: ITravel;
    review: string;
    stars: number;
    date: Date;
    visible: boolean;
  }




  export interface IReviewProps{
    id?: string
    travelId: string,
    review: string,
    stars: number;
  }

  export interface IPromotion{
    id: string,
    travel: ITravel,
    discount: number,
    validUntil: Date,
  }

  export interface ITravel {
    id:string,
    name: string,
    country: string,
    city: string,
    date: Date,
    description: string,
    serviceType: string,
    accesibilitySeal: string,
    reviews: IReviewT[],
    images: IImage[],
    stars: number,
    promotions: IPromotion[],
    provider: ITravelProvider;
    userHistory: IUser,
    email: string,
    address: string,
    openingHours: string,
    website: string,
    phone: string,
  }


  export interface IUserResponse {
    login:boolean;
    user: Partial<IUser> | null;
    token: string;
  }
export interface IReview{
  id: string,
  user: IUser,
  travel: ITravel,
  review: string,
  stars: number;
}

export interface IPromotion{
  id: string,
  travel: ITravel,
  discount: number,
  validUntil: Date,
}



export interface IUserResponse {
  login:boolean;
  user: Partial<IUser> | null;
  token: string;
}

export interface ITravelContextType {
  travels: ITravel[];
  isLoading: boolean;
  error: string | null;
  filteredTravels: ITravel[];
  noResults:boolean;
  setFilteredTravels: (travels: ITravel[]) => void;
  setNoResults: (noResults: boolean) => void;
  refreshTravels: () => Promise<void>;
}

export interface TravelSearchProps {
  onSearchToggle: (searching: boolean) => void;
}

export interface IUserProps{
auth: boolean,
block: false,
createdAt: string,
credential: ICredential,
id: string,
name: string,
phone: string
}

export interface IUserContextType {
  user: Partial<IUserProps> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserProps> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (user: IRegister) => Promise<boolean>;
  logOut: () => void;
}

export interface ITravelCardProps {
  travels: ITravel; 
  index?: number; 
};


export interface ICarouselProps {
  items: IImage[];
}
export interface IBlogArticle {
  id: string;
  title: string;
  content: string;
  images: IImageBlog[];
  date: string;
  visible: boolean;
}

 export interface IReviewT {
  id:string,
  review:string,
  stars: number,
  date: string,
  visible?: boolean;
 }

export interface ITravelReview{
  id: string,
  name: string,
  reviews: IReviewT[],
}