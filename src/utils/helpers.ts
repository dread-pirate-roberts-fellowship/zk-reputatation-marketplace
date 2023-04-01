import { itemType } from "./types";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere cursus ex, id placerat lorem rutrum eget. Nam feugiat augue et nulla gravida feugiat. Maecenas efficitur sagittis bibendum. Praesent id rutrum odio. Vivamus sagittis est id nulla egestas dignissim. Nulla feugiat porttitor leo, eget tempus urna tempus in. Quisque et dolor ante. Aliquam erat volutpat. Nulla consequat erat a suscipit pretium. Ut in tempor lacus. Curabitur consectetur bibendum sem sed porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam luctus cursus iaculis. Quisque elementum sapien dolor, venenatis finibus justo euismod quis. Pellentesque in lectus malesuada, sodales turpis in, tincidunt urna. Duis in accumsan est, non interdum sem. Sed luctus vitae orci ac viverra. Morbi commodo aliquet libero sit amet congue. Pellentesque dui sem, posuere a porttitor in, tempor et odio. Pellentesque ac nibh sodales, ullamcorper orci vel, finibus eros. Morbi porttitor egestas tortor sit amet consectetur. Donec quis ex nisi. Donec iaculis mauris sit amet maximus pretium. Vestibulum gravida dolor eu dui venenatis, et luctus nulla faucibus. Donec in neque sed risus euismod laoreet id non magna. Cras vitae dignissim ipsum. Nunc magna mauris, fermentum vitae est sit amet, varius viverra erat. Sed nec faucibus odio, nec suscipit leo. Duis eget felis ultrices velit consectetur luctus vel sit amet ligula. Pellentesque interdum velit magna. Sed blandit sollicitudin sodales. Vestibulum maximus laoreet pretium. Quisque in accumsan dui, nec facilisis tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam lobortis porttitor rhoncus. Phasellus purus nibh, ultricies pellentesque pulvinar non, finibus non erat. Fusce nec blandit urna. Donec consequat porttitor massa vitae dapibus. Duis et facilisis ante. Aliquam sed dui vitae neque volutpat ullamcorper. Mauris volutpat, nibh id vehicula efficitur, mauris erat fermentum mi, vel laoreet lectus ligula eget orci. Nam dignissim ullamcorper maximus. Ut tempor a sapien non consectetur. Sed mattis cursus tellus, vitae faucibus sapien molestie volutpat. Phasellus eget odio nunc. Nam ut pharetra odio. Vestibulum aliquam eu est id porta. Praesent ac tellus massa. Vestibulum sit amet sollicitudin mauris, et tempor sem. Vestibulum ornare iaculis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce eleifend ante ut dui suscipit, placerat bibendum justo rutrum. Phasellus ut lacus suscipit lorem imperdiet porttitor. Nunc commodo, nisi nec molestie consequat, dolor ligula dapibus libero, eget sollicitudin orci nunc a leo. Morbi sed diam eu mauris vulputate rutrum. Suspendisse ultrices leo non felis venenatis imperdiet.";
export const items: itemType[] = [
  {
    sellerAddress: "reivmrforefrefperfrefrelfrleflre",
    reputationQuantity: 1000,
    reputationQuality: 8,
    price: 1000,
    name: "Best item lfg",
    long_desc: lorem,
    pic: "https://i.pinimg.com/originals/e5/77/12/e57712672fa515e441498f4539fe0f37.jpg",
  },
  {
    sellerAddress: "reivmrforefrefperfrefrelfrleflre",
    reputationQuantity: 1000,
    reputationQuality: 8,
    price: 1000,
    name: "Best item lfg",
    long_desc: lorem,
    pic: "https://i.pinimg.com/originals/e5/77/12/e57712672fa515e441498f4539fe0f37.jpg",
  },
  {
    sellerAddress: "reivmrforefrefperfrefrelfrleflre",
    reputationQuantity: 1000,
    reputationQuality: 8,
    price: 1000,
    name: "Best item lfg",
    long_desc: lorem,
    pic: "https://i.pinimg.com/originals/e5/77/12/e57712672fa515e441498f4539fe0f37.jpg",
  },
  {
    sellerAddress: "reivmrforefrefperfrefrelfrleflre",
    reputationQuantity: 1000,
    reputationQuality: 8,
    price: 1000,
    name: "Best item lfg",
    long_desc: lorem,
    pic: "https://i.pinimg.com/originals/e5/77/12/e57712672fa515e441498f4539fe0f37.jpg",
  },
];
export const users: userType[] = [
  {
    id: 1,
    username: "alice",
    address: "101b 1st St., Veteran, WY 82243",
    reputationQuantity: 133,
    reputationQuality: 8,
    items: items,
  },
  {
    id: 2,
    username: "bob",
    address: "3972 North Alta Vista Rd., Torrington, WY 82240",
    reputationQuantity: 18,
    reputationQuality: 9,
    items: items,
  },
  {
    id: 3,
    username: "carol",
    address: "Rue de Camões #6, 2250-021, Constancia, Portugal",
    reputationQuantity: 92,
    reputationQuality: 7,
    items: items,
  },
  { 
    id: 4,
    username: "dave",
    address: "Wijnveld 67, Zele, 9240, Belgium ",
    reputationQuantity: 1,
    reputationQuality: 3,
    items: items,
  },
]
