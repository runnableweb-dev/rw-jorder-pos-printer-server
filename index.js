const express = require("express");

const escpos = require("escpos");
escpos.Network = require("escpos-network");

const app = express();

const router = express.Router();
app.use("/", router);

router.get("/", (req, res) => {
  const device = new escpos.Network("192.168.1.23", 9100);

  // todo to change encoding to supprot hebrew
  // const options = { encoding: "WPC1255(Israel)" /* default */ };
  const options = { encoding: "Hebrew" };
  
  const printer = new escpos.Printer(device, options);

  device.open(function (error) {
    if (error) {
      console.log(`device opening error`);
      console.log(error);
      return;
    }
    try {
    printer
      .font("a")
      .align("ct")
      .style("bu")
      .size(1, 1)
      .text("אחד שתיים שלוש")
      // .text("The quick brown fox jumps over the lazy dog")
      // .text("敏捷的棕色狐狸跳过懒狗")
      // .barcode("1234567", "EAN8")
      // .table(["One", "Two", "Three"])
      // .tableCustom(
      //   [
      //     { text: "Left", align: "LEFT", width: 0.33, style: "B" },
      //     { text: "Center", align: "CENTER", width: 0.33 },
      //     { text: "Right", align: "RIGHT", width: 0.33 },
      //   ],
      //   { encoding: "cp857", size: [1, 1] } // Optional
      // )
      .cut()
      .close();
      
      res.json("hihi");
    } catch(err) {
      console.log(`actual printing error: `); console.log(err);
      res.status(500).json(err);
    }
      // .qrimage("https://github.com/song940/node-escpos", function (err) {
      //   if (err) {
      //     throw err;
      //   }

      // printer.cut();
      // printer.close();
      // res.json("hihi");
       
      // });

  });
});

app.listen(8085);
