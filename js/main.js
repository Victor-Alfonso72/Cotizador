(function() {
    var $baseUrl, $selectModelo, $split, $targetContent, $targetFeatures, $targetLegal, $targetSelect, $tmpGTM, $toSend, $valSpecs;
  
    $baseUrl = 'exec/adminAjax.php';
  
    // NODRAGIMAGE
    $('img').on('dragstart', function(event) {
      event.preventDefault();
    });
  
    // TOGGLE LEGAL
    $targetLegal = $('.summary');
  
    $('.toggle-box').on('change', function() {
      if ($(this).is(':checked')) {
        $targetLegal.fadeIn();
        $('html, body').animate({
          scrollTop: $targetLegal.offset().top
        }, 1000);
      } else {
        $('html, body').animate({
          scrollTop: 0
        }, 400, function() {
          $targetLegal.fadeOut();
        });
      }
    });
  
    // HASH INIT
    if (window.location.hash.length > 0) {
      $split = window.location.hash.split("/");
      // CAMBIANDO MODELO
      $targetSelect = $('select#version');
      $targetContent = $('.right.version');
      $targetFeatures = $('.features .version');
      $selectModelo = $('select#modelo').find('option[data-code="' + $split[1] + '"]');
      $selectModelo.prop('selected', true);
      $tmpGTM = $.parseJSON($selectModelo.attr('data-gtm'));
      $('input[name="ipt_modelo"]').val($selectModelo.attr('data-name'));
      $('.features .version .left p a span').html($selectModelo.attr('data-name'));
      /* RESET SELECT */
      $targetSelect.empty();
      $targetFeatures.find('.right ul').empty();
      $valSpecs = '';
      //$valOption = '<option value="">SELECCIONAR VERSIÓN</option>'
      $toSend = {
        action: 'get_versiones',
        dataForm: $selectModelo.val()
      };
      $.post($baseUrl, $toSend, function(response) {
        var aRandom, axel, json;
        json = $.parseJSON(response);
        /*
        $.each json[0], (index, value) ->
          $valOption += '<option value="' + value.vid + '" data-code="' + value.codigo + '" data-name="' + value.version + '">' + value.version + '</option>'
          return
        */
        $.each(json[1], function(index, value) {
          $valSpecs += '<li><div class="cont-image"><span style="background-image: url(images/caracteristicas/' + value.imagen + ')">' + value.nombre + '</span></div><p>' + value.nombre + '</p></li>';
        });
        $targetContent.find('.image-version span').css('background-image', 'url("images/modelos/' + json[0][0].imagen + '")');
        $targetContent.find('.prices-list .top .name-version h1').html(json[0][0].modelo);
        $targetContent.find('.prices-list .top .name-version h2').html(json[0][0].version);
        $targetContent.find('.prices-list .bottom .plan-autorenuevate p:nth-child(2) span:nth-child(2)').html(json[0][0].valor_02);
        $targetFeatures.find('.left p a').attr('href', json[0][0].showroom);
        $targetFeatures.find('.left p span').html(json[0][0].modelo);
        $('.legal .summary').html(json[0][0].legal);
        $('input[name="ipt_autoplan"]').val(json[0][0].valor_01);
        $('input[name="ipt_autorenuevate"]').val(json[0][0].valor_02);
        axel = Math.random() + "";
        aRandom = axel * 10000000000000000;
        $('#fl-code').html('<iframe src="https://' + $tmpGTM.id + '.fls.doubleclick.net/activityi;src=' + $tmpGTM.id + ';type=' + $tmpGTM.type + ';cat=' + $tmpGTM.cat + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + aRandom + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
      }).done(function() {
        //$targetSelect.append $valOption
        $targetFeatures.find('.right ul').append($valSpecs);
      });
    }
  
    // CAMBIAR MODELO
    // CAMBIANO VERSION
    /*
    if $split[2] isnt undefined
      $targetContent = $('.prices-list')
      $selectVersion = $('select#version').find('option[data-code="' + $split[2] + '"]')
      $selectVersion.prop 'selected', true
  
      $('input[name="ipt_version"]').val $selectVersion.attr('data-name')
  
      $toSend =
        action: 'get_detalles'
        dataForm: $selectVersion.val()
      $.post $baseUrl, $toSend, (response) ->
        json = $.parseJSON response
        $targetContent.find('.top .name-version h2').html json.nombre
        $targetContent.find('.bottom .plan-autorenuevate p:nth-child(2) span:nth-child(2)').html json.valor_02
        $('.legal .summary').html json.legal
  
        $('input[name="ipt_autorenuevate"]').val json.valor_02
        return
    */
    $('select#modelo').on('change', function() {
      var $baseGTM, $valSelected, there;
      there = $(this);
      $valSelected = there.find('option:selected');
      $targetSelect = $('select#version');
      $targetContent = $('.right.version');
      $targetFeatures = $('.features .version');
      $baseGTM = $.parseJSON($valSelected.attr('data-gtm'));
      $('input[name="ipt_modelo"]').val($valSelected.attr('data-name'));
      /* RESET SELECT */
      $targetSelect.empty();
      $targetFeatures.find('.right ul').empty();
      $valSpecs = '';
      //$valOption = '<option value="">SELECCIONAR VERSIÓN</option>'
      $toSend = {
        action: 'get_versiones',
        dataForm: $valSelected.val()
      };
      $.post($baseUrl, $toSend, function(response) {
        var aRandom, axel, json;
        json = $.parseJSON(response);
        /*
        $.each json[0], (index, value) ->
          $valOption += '<option value="' + value.vid + '" data-code="' + value.codigo + '" data-name="' + value.version + '">' + value.version + '</option>'
          return
        */
        $.each(json[1], function(index, value) {
          $valSpecs += '<li><div class="cont-image"><span style="background-image: url(images/caracteristicas/' + value.imagen + ')">' + value.nombre + '</span></div><p>' + value.nombre + '</p></li>';
        });
        $targetContent.find('.image-version span').animate({
          opacity: 0
        });
        setTimeout(function() {
          $targetContent.find('.image-version span').css('background-image', 'url("images/modelos/' + json[0][0].imagen + '")');
          $targetContent.find('.image-version span').animate({
            opacity: 1
          });
        }, 500);
        $targetContent.find('.prices-list .top .name-version h1').html(json[0][0].modelo);
        $targetContent.find('.prices-list .top .name-version h2').html(json[0][0].version);
        $targetContent.find('.prices-list .bottom .plan-autorenuevate p:nth-child(2) span:nth-child(2)').html(json[0][0].valor_02);
        $targetFeatures.find('.left p a').attr('href', json[0][0].showroom);
        $targetFeatures.find('.left p span').html(json[0][0].modelo);
        $('.legal .summary').html(json[0][0].legal);
        $('input[name="ipt_autoplan"]').val(json[0][0].valor_01);
        $('input[name="ipt_autorenuevate"]').val(json[0][0].valor_02);
        axel = Math.random() + "";
        aRandom = axel * 10000000000000000;
        $('#fl-code').html('<iframe src="https://' + $baseGTM.id + '.fls.doubleclick.net/activityi;src=' + $baseGTM.id + ';type=' + $baseGTM.type + ';cat=' + $baseGTM.cat + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=' + aRandom + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
      }).done(function() {
        //$targetSelect.append $valOption
        $targetFeatures.find('.right ul').append($valSpecs);
        window.location.hash = "/" + $valSelected.attr('data-code');
      });
    });
  
    // CAMBIAR VERSION
    $('select#version').on('change', function() {
      var $valSelected, there;
      there = $(this);
      $valSelected = there.find('option:selected');
      $targetContent = $('.prices-list');
      $('input[name="ipt_version"]').val($valSelected.attr('data-name'));
      $toSend = {
        action: 'get_detalles',
        dataForm: $valSelected.val()
      };
      $.post($baseUrl, $toSend, function(response) {
        var json;
        json = $.parseJSON(response);
        $targetContent.find('.top .name-version h2').html(json.nombre);
        $targetContent.find('.bottom .plan-autorenuevate p:nth-child(2) span:nth-child(2)').html(json.valor_02);
        $('.legal .summary').html(json.legal);
        $('input[name="ipt_autorenuevate"]').val(json.valor_02);
      }).done(function() {
        var split;
        split = window.location.hash.split("/");
        window.location.hash = "/" + split[1] + "/" + $valSelected.attr('data-code');
      });
    });
  
    // FORMARTO RUT
    $('input[id="rut"]').on('keyup', function() {
      var there;
      there = $(this);
      there.val(formato_rut(there.val(), true));
    });
  
    // SUBMIT FORM
    $('#form2send').validate({
      errorElement: 'span',
      rules: {
        telefono: {
          minlength: 8,
          maxlength: 9,
          digits: true
        },
        rut: {
          maxlength: 10,
          valrut: $('input[name="rut"]').val()
        }
      },
      submitHandler: function() {
        var $btnForm, $form, $prevText;
        $form = $('#form2send');
        $btnForm = $form.find('.btn-submit');
        $prevText = $btnForm.text();
        $btnForm.prop('disabled', true);
        $btnForm.text('Enviando...');
        $toSend = {
          action: 'put_form',
          dataForm: $form.serialize()
        };
        $.post($baseUrl, $toSend, function(response) {
          if (response) {
            $form[0].reset();
            window.location.href = 'gracias.php';
          }
        });
      }
    });
  
  }).call(this);
  