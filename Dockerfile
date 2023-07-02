FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
# RUN npm run db:migrate

EXPOSE 8000

CMD ["npm", "run", "start:prod"]