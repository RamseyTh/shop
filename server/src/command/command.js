module.exports = class Command {
  constructor() {}
  static addData(mod, _data) {
    //add
    return mod
      .insertMany(_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static delData(mod, _id) {
    //delete
    return mod
      .deleteOne({ _id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  /* update Data
   * @param {object} mod       
   * @param {string} _id   
   * @param {object} data    
   */
  static updateData(mod, _id, data) {
    //change
    return mod
      .updateOne(
        {
          _id,
        },
        data
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static findData(mod, _key) {
    //search
    return mod
      .find(_key)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  /* find by page
   * @param {object} mod      
   * @param {number} sort    
   * @param {number} page    
   * @param {number} pageSize  
   * @param {number} pageSize 
   */
  static async findByPage(mod, sort, page, pageSize, keyWord) {

    return await mod
      .find(keyWord)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }
  static async getTotalPage(mod, pageSize, _keyWord) {
    let allNum = await mod.find().countDocuments(_keyWord);
    return { totalPage: parseInt(allNum / pageSize) + 1, allNum };
  }
};
