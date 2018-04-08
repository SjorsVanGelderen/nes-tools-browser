import
  { List
  } from "immutable"

import
  { Point
  } from "../utils"

import
  { State
  } from "../Models/state"

import
  { Mailbox
  } from "../Models/mail"

export const mailboxZero: Mailbox =
  { paletteMail   : List()
  , samplesMail   : List()
  , characterMail : List()
  , inputMail     : List()
  , threeMail     : List()
  }

export const updateMailbox: (s: State) => State = (s: State) => {
  return { ...s, mailbox: mailboxZero }
}