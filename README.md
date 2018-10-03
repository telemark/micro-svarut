[![Build Status](https://travis-ci.org/telemark/micro-svarut.svg?branch=master)](https://travis-ci.org/telemark/micro-svarut)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-svarut

REST-api for KS-SvarUt.

Look at this [WIKI](https://github.com/telemark/svarut/wiki) for field descriptions.

# API

| Method | Path | Description |
| --- | --- | --- |
| GET | / | This readme |
| POST | /sendForsendelse | Sender inn forsendelse til ekspedering av KS-SvarUt |
| GET | /retrieveForsendelseStatus | Henter status for en forsendelse |
| POST | /retrieveForsendelseStatuser | Henter status for flere forsendelseer |
| GET | /retrieveForsendelseHistorikk | Henter historikk for en forsendelse |
| POST | /retrieveForsendelseIdByEksternRef | Henter liste med forsendelseider |
| POST | /setForsendelseLestAvEksterntSystem | Sette status til lest når dokumentet har blitt lest |
| POST | /retrieveSigneringshistorikkForFlereForsendelser | Henter historikk for flere signeringsoppdrag |
| GET | /retrieveSigneringshistorikk | Henter historikk for ett signeringsoppdrag |

# Examples

### sendForsendelse

data.json
```json
{
  "mottaker": [
    {
      "navn": "Terje Tverrtryne",
      "adresse1": "Skogsveien 42",
      "postnr": "3710",
      "poststed": "Skien",
      "fodselsnr": "01029400475"
    }
  ],
  "dokumenter": [
    {
      "data": "BASE64_FILE",
      "filnavn": "filname.pdf",
      "mimetype": "application/pdf"
    }
  ],
  "avgivendeSystem": "node-svarut test",
  "konteringskode": "1111",
  "krevNiva4Innlogging": false,
  "kryptert": false,
  "tittel": "SvarUt testdokument",
  "kunDigitalLevering": false,
  "printkonfigurasjon": {
    "brevtype": "BPOST",
    "fargePrint": true,
    "tosidig": false
  }
}
```

`curl -H "Authorization: TOKEN" --data @data.json  http://localhost:3000/sendForsendelse`

### retrieveForsendelseStatuser

data.json
```json
{
  "forsendelseider": [
    "718e95b5-49dd-463b-8a5d-35aee3ee9850",
    "63313040-7b07-442f-a891-df0b2edf41d9"
  ]
}
```

`curl -H "Authorization: TOKEN" --data @data.json  http://localhost:3000/retrieveForsendelseStatuser`

### retrieveForsendelseStatus

`curl -H "Authorization: TOKEN" http://localhost:3000/retrieveForsendelseStatus/718e95b5-49dd-463b-8a5d-35aee3ee9850`

### retrieveForsendelseHistorikk

`curl -H "Authorization: TOKEN" http://localhost:3000/retrieveForsendelseHistorikk/718e95b5-49dd-463b-8a5d-35aee3ee9850`

### retrieveForsendelseIdByEksternRef

data.json
```json
{
  "eksternref": [
    "718e95b5-49dd-463b-8a5d-35aee3ee9850"
  ]
}
```

`curl -H "Authorization: TOKEN" --data @data.json http://localhost:3000/retrieveForsendelseIdByEksternRef`

### setForsendelseLestAvEksterntSystem

data.json
```json
{
  "forsendelsesid": "718e95b5-49dd-463b-8a5d-35aee3ee9850",
  "lestAvFodselsnummer": "11111111111",
  "navnPaEksterntSystem":"arkiv",
  "datoLest": "2017-10-25T09:45:29.102Z"
 }
```

`curl -H "Authorization: TOKEN" --data @data.json http://localhost:3000/setForsendelseLestAvEksterntSystem`

### retrieveSigneringshistorikkForFlereForsendelser

data.json
```json
{
  "forsendelseider": [ "2422cb25-bef1-4cd8-962c-3109e799dde7", "bd7d0e68-7934-41f4-8490-dea6c6179477" ]
}
```

`curl -H "Authorization: TOKEN" --data @data.json http://localhost:3000/retrieveSigneringshistorikkForFlereForsendelser`

### retrieveSigneringshistorikk

`curl -H "Authorization: TOKEN" http://localhost:3000/retrieveForsendelseHistorikk/2422cb25-bef1-4cd8-962c-3109e799dde7`

# Installation alternatives

## 1. Run on [Now](https://zeit.co/now)

Deploy to Now

```sh
now secret add svarut-url https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9
now secret add jwt-secret "Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go"
now --npm -e NODE_ENV=production -e JWT_SECRET=@jwt-secret -e SVARUT_URL=@svarut-url telemark/micro-svarut
```

## 2. Run on local machine

Set envs

```sh
export SVARUT_URL=https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9
export JWT_SECRET="Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go"
```

Install

```sh
git clone https://github.com/telemark/micro-svarut
cd micro-svarut
npm i
npm run dev
```

## 3. Run from docker hub

Set envs

```sh
export SVARUT_URL=https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9
export JWT_SECRET="Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go"
```

Start with
```sh
docker run -d \
  -p 3000:3000 \
  -e JWT_TOKEN=${JWT_TOKEN} \
  -e SVARUT_URL=${SVARUT_URL} \
  --name micro-svarut \
  telemark/micro-svarut
```

## License

[MIT](LICENSE)

