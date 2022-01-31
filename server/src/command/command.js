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
   * @param {object} mod       数据库model
   * @param {string} _id       数据唯一标识
   * @param {object} data      更新字段及值
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
   * @param {object} mod       数据库model
   * @param {number} sort      排序顺序   负数倒序 正数顺序
   * @param {number} page      当前页数
   * @param {number} pageSize  分页大小
   * @param {number} pageSize  关键字模糊查询
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
