const AdminContract = artifacts.require('./Admin.sol')
const LogicContract = artifacts.require('./UserLogic.sol')

const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
const address1 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
const address2 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
const address3 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
const address4 = '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
const address5 = '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e'
const address6 = '0x2191ef87e392377ec08e7c08eb105ef5448eced5'

AdminContract.deployed()
  .then(async (adminInstance) => {
    await adminInstance.addUser('AAABBB00A00B000C', '1234567890', '1', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User1: ' + res))
      })
      .catch(() => console.error('Error Insert User1'));
    await adminInstance.addUser('AAABBB00A00B001C', '1234567880', '1', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User2: ' + res))
      })
      .catch(() => console.error('Error Insert User2'));
    await adminInstance.addUser('AAABBB00A00B002C', '1234567870', '2', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User3: ' + res))
      })
      .catch(() => console.error('Error Insert User3'));
    await adminInstance.addUser('BBBCCC11B11C111D', '1234567891', '2', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User4: ' + res))
      })
      .catch(() => console.error('Error Insert User4'));
    await adminInstance.addUser('BBBCCC11B11C112D', '1234567881', '3', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User5: ' + res))
      })
      .catch(() => console.error('Error Insert User5'));
    await adminInstance.addUser('BBBCCC11B11C113D', '1234567871', '3', { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Insert User6: ' + res))
      })
      .catch(() => console.error('Error Insert User6'));
    /*
        LogicContract.deployed()
          .then(async userLogicInstance => {
            await userLogicInstance.signUp('AAABBB00A00B000C', '1234567890', 'asdasdasdasdasd', { from: address1 })

            await userLogicInstance.signUp('AAABBB00A00B001C', '1234567880', 'asdasdasdasdasd', { from: address2 })

            await userLogicInstance.signUp('AAABBB00A00B002C', '1234567870', 'asdasdasdasdasd', { from: address3 })

            await userLogicInstance.signUp('BBBCCC11B11C111D', '1234567891', 'asdasdasdasdasd', { from: address4 })

            await userLogicInstance.signUp('BBBCCC11B11C112D', '1234567881', 'asdasdasdasdasd', { from: address5 })

            await userLogicInstance.signUp('BBBCCC11B11C113D', '1234567871', 'asdasdasdasdasd', { from: address6 })

          })
          .then(async () => {*/
    await adminInstance.removeUser(1, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User1: ' + res))
      })
      .catch(() => console.error('Error Remove User1'));
    await adminInstance.removeUser(2, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User2: ' + res))
      })
      .catch(() => console.error('Error Remove User2'));
    await adminInstance.removeUser(3, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User3: ' + res))
      })
      .catch(() => console.error('Error Remove User3'));
    await adminInstance.removeUser(4, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User4: ' + res))
      })
      .catch(() => console.error('Error Remove User4'));
    await adminInstance.removeUser(5, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User5: ' + res))
      })
      .catch(() => console.error('Error Remove User5'));
    await adminInstance.removeUser(6, { from: address })
      .then(() => {
        adminInstance.getUsers()
          .then(res => console.log('Remove User6: ' + res))
      })
      .catch(() => console.error('Error Remove User6'));
  })
//})