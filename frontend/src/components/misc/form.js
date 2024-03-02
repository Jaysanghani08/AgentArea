import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "./Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "./Buttons.js";
import styled from "styled-components"; 

export const Container = tw.div`relative flex items-center justify-center p-12 bg-blue-100 min-h-screen`;
export const TextContent = tw.div`mx-auto w-full max-w-[950px] px-12 py-8 rounded-2xl shadow-2xl shadow-blue-800 bg-white`;
export const Subheading = tw(SubheadingBase)`mt-1 text-2xl text-center mb-4 md:text-left`;
export const Heading = tw(SectionHeading)`mt-2 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
export const HoriZontalLine = tw.div`w-full h-[3px] bg-gray-500 rounded mt-6 mb-8`;
export const Form = tw.form`mt-5`
export const FormGroup = tw.div`mb-5 grid grid-cols-1 md:grid-cols-5 gap-x-5 md:gap-x-0 md:gap-y-6`
export const Label = tw.label`mb-1 flex items-center  text-base font-medium text-[#07074D] col-span-1`
export const RequiredIndicator = tw.span`text-red-500`
export const Input = tw.input`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-4`
export const Select = tw.select`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-4`
export const HalfInput = tw.input`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-1`
export const HalfSelect = tw.select`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md col-span-1`
export const ErrorMsg = tw.p`text-red-500 col-span-4`
export const Gap = tw.div`col-span-1`
export const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}`

export const SubmitButton = tw(PrimaryButtonBase)`flex justify-center items-center inline-block mt-8`