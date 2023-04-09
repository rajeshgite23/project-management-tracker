FROM node:alpine

LABEL version="1.0" \
      Author="sumanshunankana@gmail.com" \
      description="E-Stock-Market Case Study by IIHT"

WORKDIR /e-stock-market

ENV PATH /e-stock-market/node_modules/.bin:$PATH

COPY . /e-stock-market

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]