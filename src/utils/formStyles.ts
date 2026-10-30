// Classes compartilhadas pelos campos de formulário
export const inputClass = (hasError: boolean) =>
  `w-full bg-bgPrimary border rounded-lg px-4 py-3 text-sm sm:text-base text-textPrimary placeholder:text-textSecondary/60 transition-colors focus:outline-none ${
    hasError ? "border-red-400 focus:border-red-400" : "border-borderColor focus:border-brandPrimary"
  }`;
