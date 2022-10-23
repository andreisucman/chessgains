export function handleCopyTokenAddress() {
  setCopyTokenText("Copied");
  navigator.clipboard.writeText(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

  setTimeout(() => {
    setCopyTokenText("Copy");
  }, 1500);
}