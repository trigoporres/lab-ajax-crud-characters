const charactersAPI = new APIHandler("http://ih-api.herokuapp.com");

$(document).ready( () => {
  $('#fetch-all').on('click', (e) => {
    charactersAPI.getFullList().then(user => {
      user.forEach(user => {
        const $generalContainer = $('.characters-container');
        const $userContainer = $('<div>').addClass('character-info');
        const $userId = $('<div>').addClass('id').text(`Id: ${user.id}`);
        const $userName = $('<div>').addClass('name').text(`Name: ${user.name}`);
        const $userOccupation = $('<div>').addClass('Occup:').text(`occupation: ${user.occupation}`);
        const $userWeapon = $('<div>').addClass('weapon').text(`Weapon: ${user.weapon}`);

        $userContainer
          .append($userId)
          .append($userName)
          .append($userOccupation)
          .append($userWeapon);
        $generalContainer.append($userContainer);
      });
    });

  });

  $('#fetch-one').on('click', (e) => {
    const searchId = $("input[name='character-id']").val();
    charactersAPI.getOneRegister(searchId)
      .then(user => {
        console.log(searchId);
        const $userContainer = $('<div>').addClass('character-info');
        const $generalContainer = $('.characters-container');
        const $userId = searchId;
        const $userName = $('<div>').addClass('name').text(`Name: ${user.name}`);
        const $userOccupation = $('<div>').addClass('Occup:').text(`occupation: ${user.occupation}`);
        const $userWeapon = $('<div>').addClass('weapon').text(`Weapon: ${user.weapon}`);

        $userContainer
          .append($userId)
          .append($userName)
          .append($userOccupation)
          .append($userWeapon);
        $generalContainer.append($userContainer);
      });
  });

  $('#delete-one').on('click', (e) => {
    const deleteId = $("input[name='character-id-delete']").val();
    console.log(deleteId);
    charactersAPI.deleteOneRegister(deleteId)
      .then(user =>{
        console.log("borrado");
      });
  });

  $('#edit-character-form').on('submit', (e) => {
    event.preventDefault();
    const idEdit = $("#idEdit").val();
    const nameEdit = $("#nameEdit").val();
    const occupationEdit = $("#occupationEdit").val();
    const weaponEdit = $("#weaponEdit").val();
    const debtEdit = $("#debtEdit").val();
    const user = {
      id: idEdit,
      name: nameEdit,
      occupation: occupationEdit,
      weapon: weaponEdit,
      debt:debtEdit,
    };
    console.log(user);
    charactersAPI.updateOneRegister(user)
      .then(user => {
        console.log("cambiado");
      })
      .catch(user =>{
        console.log("error");
      });
  });

  $('#new-character-form').on('submit', (e) => {
    event.preventDefault();
    const newName = $("#new-character-name").val();
    const newOccupation = $("#new-character-occupation").val();
    const newWeapon = $("#new-character-weapon").val();
    const newDebt = $("#new-character-debt").val();
    const user = {
      name: newName,
      occupation: newOccupation,
      weapon: newWeapon,
      debt: newDebt,
    };
    charactersAPI.createOneRegister(user)
      .then(user => {
        console.log("añadido");
      });
  });
});
