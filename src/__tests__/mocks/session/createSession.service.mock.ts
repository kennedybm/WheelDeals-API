import { hashSync } from "bcryptjs";

export default {
  secretKey: "dsadasd3423dasd5$#",
  base: {
    name: "Test",
    email: "test@email.com",
    password: hashSync("validPwd", 12),
    description: "Apaixonado por motos",
    cpf: "87645688843",
    cell: "82998440012",
    birthDate: "1994/09/15",
    accountType: "Seller",
    cep: "0005589",
    state: "RJ",
    city: "Rio de Janeiro",
    street: "rua 1",
    number: 10,
    complement: "Ao lado da quitanda",
  },
  valid: {
    email: "test@email.com",
    password: "validPwd",
  },
  invalidEmail: {
    email: "invalidEmail@email.com",
    password: "validPwd",
  },
  invalidPassword: {
    email: "test@email.com",
    password: "invalidPwd",
  },
};
