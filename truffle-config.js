
---

### **8. truffle-config.js**

**Purpose:**  
The configuration file for Truffle, used to deploy contracts to different networks, including Base.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
