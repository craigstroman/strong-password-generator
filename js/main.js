var passwordGenerator = function () {
    "use strict";

    var _btnCopyPassword = document.getElementById( "copy-password" );
    var _btnGeneratePassword = document.getElementById( "generate-password" );
    var _charSet = {
        alphaNumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        specialCharacters: "^%&*()+=\-\[\]\\\';,\.\/\{\}\|\""
    };
    var _errorText = document.getElementById( "error-text" );
    var _newPasswordField = document.querySelector( ".strong-password-result" );
    var _newPassword = null;
    var _passwordCopiedText = document.querySelector( ".password-copied-text" );
    var _passwordLengthField = document.querySelector( ".strong-password-length" );
    var _specailCharactersField = document.getElementById( "special-characters" );

    var _copyPassword = function () {
        if ( _newPasswordField && _newPasswordField.select ) {
            _newPasswordField.focus();
            _newPasswordField.select();
            try {
                document.execCommand( "copy" );
                _passwordCopiedText.style.display = "block";
            } catch ( e ) {
                alert( "Please press (ctrl/cmd)+c to copy the new password." );
            }
        }
    };

    var _generatePassword = function () {
        var lengthVal = _passwordLengthField.value;

        if ( _positiveNumber( lengthVal ) ) {
            _setErrorText( "", false );
            _newPassword = _getPassword();
            _setNewPassword();
        } else {
            _passwordLengthField.focus();
            _setErrorText( "Password must have a positive length.", true );
        }
    };

    var _getPassword = function () {
        var lengthVal = _passwordLengthField.value;
        var passwordCharacters = ( _specailCharactersField.checked ) ? passwordCharacters + _charSet.alphaNumeric + _charSet.specialCharacters : passwordCharacters + _charSet.alphaNumeric;
        var result = "";

        for ( var i = 0; i < lengthVal; i++ ) {
            result += passwordCharacters.charAt( Math.floor( Math.random() * passwordCharacters.length ) );
        }

        return result;
    };

    var initGenerator = function () {
        if ( _btnCopyPassword ) {
            _btnCopyPassword.disabled = true;
        }

        _btnGeneratePassword.addEventListener( "click", function ( e ) {
            e.preventDefault();

            _generatePassword();
        }, false );

        _btnCopyPassword.addEventListener( "click", function ( e ) {
            e.preventDefault();

            _copyPassword();
        }, false );

        _passwordLengthField.addEventListener( "keyup", function ( e ) {
            if ( this.value.length === 0 ) {
                if ( _newPasswordField.value.length >= 1 ) {
                    _passwordCopiedText.style.display = "none";
                    _setErrorText( "", false );
                    _newPasswordField.value = "";
                    _btnCopyPassword.disabled = true;
                    _btnCopyPassword.setAttribute( "class", "disabled" );
                }
            } else if ( this.value.length >= 1 ) {
                if ( _newPasswordField.value.length >= 1 ) {
                    _passwordCopiedText.style.display = "none";
                    _setErrorText( "", false );
                    _newPasswordField.value = "";
                    _btnCopyPassword.disabled = true;
                    _btnCopyPassword.setAttribute( "class", "disabled" );
                }
            }
        }, false );
    };

    var _positiveNumber = function ( val ) {
        val = parseFloat( val );

        if ( !isNaN( val ) ) {
            if ( val > 0 ) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    };

    var _setErrorText = function ( error, showError ) {
        if ( error.length >= 1 && showError ) {
            _errorText.innerHTML = error;
            _errorText.style.display = "block";
        } else {
            _errorText.innerHTML = null;
            _errorText.style.display = "none";
        }
    };

    var _setNewPassword = function () {
        _newPasswordField.value = _newPassword;
        _btnCopyPassword.disabled = false;
        _btnCopyPassword.removeAttribute( 'class' )
        _btnCopyPassword.removeAttribute( 'disabled' );
    };

    return {
        initGenerator: initGenerator
    };
};

( function () {
    var passwordGen = new passwordGenerator();
    var wrapper = document.querySelector( ".chrome-password-generator-wrapper" );

    if ( wrapper ) {
        passwordGen.initGenerator();
    }
} )();
