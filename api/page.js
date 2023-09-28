export default [
  {
    path: "/",
    method: "get",
    response: {
      code: 0,
      "data|10": [
        {
          "id|+1": 1,
          title: "@title",
          content: "@paragraph",
          "status|0-1": 0,
        },
      ],
    },
  },
  {
    path: "/total",
    method: "get",
    response: {
      code: 0,
      data: 50,
    },
  },
  {
    path: "/",
    method: "post",
    response: {
      code: 0,
      data: {},
    },
  },
  {
    path: "/",
    method: "put",
    response: {
      code: 0,
      data: {},
    },
  },
  {
    path: "/delete",
    method: "put",
    response: {
      code: 0,
      data: {},
    },
  },
];
