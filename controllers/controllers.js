const getHome = async (req, res) => {
  parseInitial().then(async () => {
    if (Parse.initialize) {
      res.render("index", {
        RegisterMessage: "",
        typeStatus: "",
        getAllTodos: await getAllTodos(),
      });
    }
  });
};

const getCreate = async (req, res) => {
  let infoTitle = req.body;
  console.log(infoTitle.title);
  const Todo = Parse.Object.extend("TodoNode");
  const todo = new Todo();

  todo.set("title", infoTitle.title);

  todo.save().then(
    async (todo) => {
      console.log("New object created with objectId: " + todo.id);
      parseInitial().then(async () => {
        if (Parse.initialize) {
          res.render("index", {
            RegisterMessage: "",
            typeStatus: "",
            getAllTodos: await getAllTodos(),
          });
        }
      });
    },
    async (error) => {
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
      parseInitial().then(async () => {
        if (Parse.initialize) {
          res.render("index", {
            RegisterMessage: "",
            typeStatus: "",
            getAllTodos: await getAllTodos(),
          });
        }
      });
    }
  );
};

const getDelete = async (req, res) => {
  let infoId = req.params;
  const Todo = Parse.Object.extend("TodoNode");
  const query = new Parse.Query(Todo);

  query.get(infoId.id, {
    success: function(yourObj) {
      yourObj.destroy().then(async () => {
        console.log("New object deleted with objectId: " + yourObj);
        parseInitial().then(async () => {
            if (Parse.initialize) {
              res.render("index", {
                RegisterMessage: "",
                typeStatus: "",
                getAllTodos: await getAllTodos(),
              });
            }
          });
      });
    },
    error: function(object, error) {
      console.log(error.message);
    },
  });
};

async function getAllTodos() {
  var getAll = [];
  const Todo = Parse.Object.extend("TodoNode");
  const query = new Parse.Query(Todo);
  const results = await query.find();
  getAll = results;
  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    console.log(object.id + " - " + object.get("title"));
  }
  return getAll;
}

async function parseInitial() {
  Parse.initialize(
    "xVeYmbicBhvCT4xYjyMQRh2AqWIhgp6o9d0m9Zcc",
    "3GgM5yycB46dJym2HVB1iYlkBPtvHqtbC8Gx5A8v"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
}

module.exports = {
  getHome,
  getCreate,
  getDelete,
};
