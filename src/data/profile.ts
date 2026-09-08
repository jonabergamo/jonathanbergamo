import type { Localized } from "./types";

export const profile = {
  name: "Jonathan Oliveira Bergamo",
  shortName: "Jonathan Bergamo",
  email: "jonathanbergamo16@gmail.com",
  linkedin: "https://www.linkedin.com/in/jonathanbergamo",
  github: "https://github.com/jonabergamo",
  location: {
    en: "São Paulo, Brazil",
    pt: "São Paulo, Brasil",
  } satisfies Localized,
  openToWork: true,
  cv: {
    en: "/cv/jonathan-bergamo-cv-en.pdf",
    pt: "/cv/jonathan-bergamo-cv-pt.pdf",
  },
  summary: {
    en: "I build products end to end: Django and DRF services, React and React Native apps, and the CI that keeps them honest. At Natoora I own features across a wholesale ERP, Django microservices and Expo apps serving six regions, and I like the unglamorous work too: root-causing production incidents, migrating legacy code, writing the discovery that defines the next sprint.",
    pt: "Construo produtos de ponta a ponta: serviços Django e DRF, apps React e React Native, e a CI que mantém tudo honesto. Na Natoora sou dono de features em um ERP de atacado, microsserviços Django e apps Expo que atendem seis regiões. Também gosto do trabalho sem glamour: achar a causa raiz de incidentes em produção, migrar código legado, escrever a discovery que define o próximo sprint.",
  } satisfies Localized,
  stats: { years: "3.5+", incidents: "64", regions: "6" },
  since: { year: 2022, month: 12 },
};
