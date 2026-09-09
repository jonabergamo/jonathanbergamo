import type { Localized } from "./types";

export type Volunteering = {
  id: string;
  organisation: string;
  role: Localized;
  period: string;
  location: Localized;
  summary: Localized;
  initiatives: Localized<{ title: string; body: string }[]>;
  url?: string;
};

export const volunteering: Volunteering[] = [
  {
    id: "rotaract-sorocaba",
    organisation: "Rotaract Sorocaba",
    role: {
      en: "Member and project volunteer",
      pt: "Membro e voluntário de projetos",
    },
    period: "2023 – 2024",
    location: { en: "Sorocaba, Brazil", pt: "Sorocaba, Brasil" },
    url: "https://www.rotary.org/en/get-involved/rotaract-clubs",
    summary: {
      en: "Rotaract is Rotary's network of young leaders. In Sorocaba I helped organise community response and fundraising. None of it involves code. All of it involves getting people to show up.",
      pt: "O Rotaract é a rede de jovens líderes do Rotary. Em Sorocaba ajudei a organizar ações de resposta comunitária e arrecadação. Nada disso envolve código. Tudo envolve fazer gente aparecer no dia.",
    },
    initiatives: {
      en: [
        {
          title: "Clothing drive for the Rio Grande do Sul floods",
          body: "I helped run a donation campaign after the 2024 floods. Collection points, sorting, and getting the clothes on their way south.",
        },
        {
          title: "Fundraising with Rotary partners",
          body: "I organised fundraising with Rotary clubs and international partners to support community projects in the region.",
        },
      ],
      pt: [
        {
          title: "Campanha de roupas para as enchentes do Rio Grande do Sul",
          body: "Ajudei a tocar uma campanha de doação depois das enchentes de 2024. Pontos de coleta, triagem e o envio das roupas para o sul.",
        },
        {
          title: "Arrecadação com parceiros do Rotary",
          body: "Organizei arrecadações com clubes Rotary e parceiros internacionais para apoiar projetos comunitários na região.",
        },
      ],
    },
  },
];
