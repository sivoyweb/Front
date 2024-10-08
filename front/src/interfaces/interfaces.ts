export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterGoogle {
  name: string;
  token: string;
  email: string;
  phone: string;
}

export interface IDisability {
  id: string;
  name: string;
  category: string;
  user: IUser;
}

export interface IDisabilityprops {
  id: string;
  name: string;
  active: boolean;
  user: IUser;
}

export interface IloginGoogle {
  name: string;
  token: string;
  phone: string;
  email: string;
}

export interface ISuggestion {
  id: string;
  user: IUser;
  name: string;
  country: string;
  city: string;
  date: Date;
  price: number;
  description: string;
  typeService: string;
  accesibilitySeal: string;
  imagesUrl: IImage[];
  state: boolean;
}

export interface IRole {}

export interface IUserChange {
  name: string;
  phone: string;
  credential: { avatar: { url: string; publicId: string } };
  disability: IDisability[];
  id: string;
}

export interface IUser {
  id?: string;
  name: string;
  role: string;
  disabilities: IDisability[];
  phone: number;
  createdAt: Date;
  auth: boolean;
  cascade: true;
  credential: ICredential;
  reviews: IReview[];
  donations: IDonation[];
  suggestions: ISuggestion[];
  history: ITravel[];
  block: boolean;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICredential {
  id: string;
  email: string;
  password: string;
  avatar: IImage;
  user: IUser;
}

export interface ICredentialAvatar {
  url: string;
  publicId: string;
}

export interface IFormData {
  name: string;
  phone: string;
  disabilities: string[];
  credential: Credential;
  isRepresentative: boolean;
  id: string | undefined;
}

export interface IImage {
  id: string;
  url?: string | null;
  publicId: string;
  alt?: string;
  active?: boolean;
}

export interface IImageBlog {
  url: string;
  alt?: string;
}

export interface ITravelProvider {
  id: string;
  travel: ITravel;
  provider: IProvider;
}

export interface IProvider {
  id: string;
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

export interface IReviewProps {
  id?: string;
  travelId: string;
  review: string;
  stars: number;
}

export interface IPromotion {
  id: string;
  travel: ITravel;
  discount: number;
  validUntil: Date;
}

export interface ITravel {
  filter(arg0: (travel: unknown) => boolean): unknown;
  id: string;
  name: string;
  country: string;
  city: string;
  date: Date;
  description: string;
  serviceType: string;
  accesibilitySeal: string;
  reviews: IReviewT[];
  images: IImage[];
  stars: number;
  promotions: IPromotion[];
  provider: ITravelProvider;
  userHistory: IUser;
  email: string;
  address: string;
  openingHours: string;
  website: string;
  phone: string;
  averageStars: number;
  accessibilitySealName: string;
}

export interface ITravelAdmin {
  id: string;
  name: string;
  country: string;
  city: string;
  date: Date;
  description: string;
  serviceType: string;
  accesibilitySeal: string;
  reviews: IReviewT[];
  images: IImage[];
  stars: number;
  promotions: IPromotion[];
  provider: ITravelProvider;
  userHistory: IUser;
  email: string;
  address: string;
  openingHours: string;
  website: string;
  phone: string;
  averageStars: number;
}

export interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

export interface IReview {
  id: string;
  user: IUser;
  travel: ITravel;
  review: string;
  stars: number;
}

export interface IPromotion {
  id: string;
  travel: ITravel;
  discount: number;
  validUntil: Date;
}

export interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

export interface IDonation {
  email: string;
  name: string;
  unit_price: number;
  description?: string;
}

export interface ITravelContextType {
  travels: ITravel[];
  isLoading: boolean;
  error: string | null;
  filteredTravels: ITravel[];
  noResults: boolean;
  setFilteredTravels: (travels: ITravel[]) => void;
  setNoResults: (noResults: boolean) => void;
  refreshTravels: () => Promise<void>;
}

export interface ITravelSearchProps {
  onSearchToggle: (searching: boolean) => void;
}

export interface IUserProps {
  auth: boolean;
  block: false;
  createdAt: string;
  credential: ICredential;
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
  isRepresentative: boolean;
  disabilities: IDisability[];
  role: string;
}

export interface IUserContextType {
  user: Partial<IUserProps> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserProps> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (user: IRegister) => Promise<boolean>;
  logOut: () => void;
  updateUser: (updatedUser: IUserChange) => void;
  loginWithGoogle: (credentials: IloginGoogle) => Promise<boolean>;
}

export interface ITravelCardProps {
  travels: ITravel;
  index?: number;
}

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

export interface IBlogArticleProps {
  article: IBlogArticle;
}

interface IUserReviews {
  id: string;
  name: string;
  role: string;
  phone: string;
  createdAt: string;
  auth: boolean;
  block: boolean;
}

export interface IReviewT {
  id: string;
  review: string;
  stars: number;
  state: string;
  date: string;
  user: IUserReviews;
}

export interface ITravelReview {
  id: string;
  name: string;
  reviews: IReviewT[];
}

export interface ITravelsProps {
  id: string;
  name: string;
  country: string;
  city: string;
  date: Date;
  description: string;
  serviceType: string;
  accesibilitySeal: string;
  averageStars: number;
  website: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  aviable: true;
  reviews: IReviewT[];
  images: IImage[];
  provider: null;
  accessibilitySealName: string;
}

export interface IAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export interface IFAQ {
  id: string;
  question: string;
  answer: string;
  visible: true;
}

export interface IFAQProps {
  question: IFAQ;
}

export interface Disability {
  id: string;
  name: string;
  active: boolean;
}

export interface IAlliances {
  id: string;
  name: string;
  url: string;
  visible: boolean;
  image: IImage;
}

export interface IProjects {
  id: string;
  name: string;
  description: string;
  visible: boolean;
}

export interface ITeam {
  id: string;
  name: string;
  description: string;
  linkedin: string;
  visible: boolean;
  image: IImage;
}

interface IPayer {
  email: string;
  name: string;
}

export interface IDonationAdmin {
  id: string;
  amount: number;
  description: string;
  date: string;
  payer: IPayer;
  status: string;
}

export interface IPromotionAdmin {
  id: string;
  name: string;
  description?: string;
  images?: IImage[];
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

export interface IUpdateTravel {
  id: string;
  name?: string;
  country?: string;
  city?: string;
  description?: string;
  serviceType?: string;
  accesibilitySeal?: IImage[];
  images?: IImage[];
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: string;
}

export interface ISendHelp {
  helpType: string;
  name: string;
  message?: string;
  email: string;
}

export interface IContact {
  subject: string;
  name: string;
  message: string;
  email: string;
}

export interface IReviewAdmin {
  id: string;
  review: string;
  stars: number;
  state: string;
  date: string;
  user: IUser;
}

export interface IFAQAdmin {
  question: string;
  answer: string;
}

export interface ITeamFormValues {
  name: string;
  description: string;
  linkedin: string;
  image: IImage;
}

export interface IAliFormValues {
  name: string;
  url: string;
  image: IImage;
}
