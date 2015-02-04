  function calculatefees() {
      var form = document.forms[0];
      var y = form.vehYear.selectedIndex;
      var vehyear = form.vehYear.options[y].value;
      var f = form.vehCost.value;
      var y = form.vehType.selectedIndex;
      var vehtype = form.vehType.options[y].value;
      var stfee = 0;
      var w = form.vehWeight.selectedIndex;
      var vehweight = form.vehWeight.options[w].value;
      switch (vehtype) {
      case "0":
          stfee = 15
          break
      case "1":
          stfee = vehweight
          break
      case "2":
          stfee = 15
          break
      case "3":
          stfee = vehweight
          break
      case "4":
          stfee = 12
          break
      default:
          stfee = 0
      }
      stfee = parseFloat(stfee);
      var fees = (vehyear * f * .03) + stfee;
      var total = CurrencyFormatted(fees);
      form.vehFees.value = "$" + total
      return true;
  }
  function Launch(page) {
      OpenWin = this.open(page, "FactoryCost", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=300,height=300");
  }
  function CurrencyFormatted(amount) {
      var i = parseFloat(amount);
      if (isNaN(i)) {
          i = 0.00;
      }
      var minus = '';
      if (i < 0) {
          minus = '-';
      }
      i = Math.abs(i);
      i = parseInt((i + .005) * 100);
      i = i / 100;
      s = new String(i);
      if (s.indexOf('.') < 0) {
          s += '.00';
      }
      if (s.indexOf('.') == (s.length - 2)) {
          s += '0';
      }
      s = minus + s;
      return s;
  }
  function calculatestfees() {
      var form = document.forms[0];
      var y = form.county.selectedIndex;
      var county = form.county.options[y].value;
      var price = form.price.value;
      var fees = county * price;
      var total = CurrencyFormatted(fees);
      form.salestax.value = "$" + total
      return true;
  }
  function Launch(page) {
      OpenWin = this.open(page, "FactoryCost", "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes,width=300,height=300");
  }
