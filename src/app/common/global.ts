export const GlobalVariables = Object.freeze({
  BASE_API_URL: 'http://localhost:9000',
  LOCAL_STORAGE_UTIL : {

      getLocal:function(key)
      {
        if (typeof (Storage) == "undefined")
        {
          return false;
        }

        try
        {
          let record = JSON.parse(localStorage.getItem(key));
          if (!record)
          {
            return null;
          }
          if(new Date().getTime() < record.timestamp && JSON.parse(record.value) != null)
          {
            return JSON.parse(record.value);
          }
          else
          {
            return null;
          }
        }
        catch (e)
        {
          return null;
        }
      },
      setLocal:function(key, jsonData, expirationMS)
      {
        if (typeof (Storage) == "undefined")
        {
          return false;
        }
        /*var expirationMS = expirationMin * 60 * 1000;*/
        if (typeof (expirationMS) == "undefined")
        {
          expirationMS = 24 * 60 * 60 * 1000;
        }
        let record =
          {
            value: JSON.stringify(jsonData),
            timestamp: new Date().getTime() + expirationMS
          };
        localStorage.setItem(key, JSON.stringify(record));
        return jsonData;
      },
      delLocal: function(key) {
        if (typeof (Storage) == "undefined")
        {
          return false;
        }
        localStorage.removeItem(key);
        return true;
      }
    },
});
