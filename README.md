this was part of the approch to understand nextjs better:
source:https://nextjs.org/learn/dashboard-app

we use pnpm (performant npm) as its a better as it uses content-addressable store to re use packages from a global list: https://pnpm.io/motivation

npm install -g pnpm

creating the nextjs app:
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm


pnpm i  

pnpm dev



to run code :
    cd nextjs-dashboard
    pnpm run dev 

project live at: https://nextjs-financial-dashboard-dusky.vercel.app/dashboard