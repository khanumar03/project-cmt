import * as z from "zod";
import { Country, ICountry, IState, State } from "country-state-city";
import { enumFromArray } from "@/lib/utils";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  first_name: z.string().min(3, {
    message: "Minimum 3 characters required",
  }),
  last_name: z.string().min(3, {
    message: "Minimum 3 characters required",
  }),
  organization_name: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

const country = Country.getAllCountries().map((country) => country.name);

export const ConferenceFormSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  country: z.enum(["", ...enumFromArray(country)]),
  state: z.string().min(1, {
    message: "state is required",
  }),
  confStartDate: z.string().transform((str) => new Date(str)),
  confEndDate: z.string().transform((str) => new Date(str)),
  paperSubmissionDueDate: z.string().transform((str) => new Date(str)),
  externalConfURL: z.string().min(1, {
    message: "url is required",
  }),
  domain: z
    .array(z.string())
    .min(1, {
      message: "minimum 1 Domain required",
    })
    .max(10, {
      message: "maximum 10 domain allowed",
    }),
  submission: z
    .number()
    .min(1, {
      message: "minimum 1 Submission required",
    })
    .max(20000, {
      message: "maximum 20000 submission are allowed",
    }),
});
