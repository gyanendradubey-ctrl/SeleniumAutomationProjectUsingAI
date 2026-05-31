package com.salesforce.pages;

import java.time.Duration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {
  private final WebDriver driver;
  private final WebDriverWait wait;

  @FindBy(xpath = "//input[@id='username']")
  private WebElement username;

  @FindBy(xpath = "//input[@id='password']")
  private WebElement password;

  @FindBy(xpath = "//input[@id='Login']")
  private WebElement loginButton;

  @FindBy(xpath = "//input[@id='rememberUn']")
  private WebElement rememberMe;

  @FindBy(xpath = "//div[contains(@class,'error')]")
  private WebElement errorMessage;

  public LoginPage(WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
  }

  public void openLoginPage(String url) {
    try {
      driver.get(url);
      wait.until(ExpectedConditions.visibilityOf(username));
    } catch (Exception e) {
      throw new RuntimeException("Login page not loaded", e);
    }
  }

  public void enterUsername(String user) {
    try {
      wait.until(ExpectedConditions.visibilityOf(username));
      username.clear();
      username.sendKeys(user);
    } catch (Exception e) {
      throw new RuntimeException("Unable to enter username", e);
    }
  }

  public void enterPassword(String pass) {
    try {
      wait.until(ExpectedConditions.visibilityOf(password));
      password.clear();
      password.sendKeys(pass);
    } catch (Exception e) {
      throw new RuntimeException("Unable to enter password", e);
    }
  }

  public void toggleRememberMe(boolean enable) {
    try {
      wait.until(ExpectedConditions.elementToBeClickable(rememberMe));
      if (rememberMe.isSelected() != enable) {
        rememberMe.click();
      }
    } catch (Exception e) {
      throw new RuntimeException("Unable to toggle remember me", e);
    }
  }

  public void clickLogin() {
    try {
      wait.until(ExpectedConditions.elementToBeClickable(loginButton));
      loginButton.click();
    } catch (Exception e) {
      throw new RuntimeException("Unable to click login", e);
    }
  }

  public void doLogin(String user, String pass, boolean remember) {
    enterUsername(user);
    enterPassword(pass);
    toggleRememberMe(remember);
    clickLogin();
  }

  public String getErrorMessageText() {
    try {
      wait.until(ExpectedConditions.visibilityOf(errorMessage));
      return errorMessage.getText().trim();
    } catch (Exception e) {
      return "";
    }
  }

  public boolean isLoginButtonDisplayed() {
    try {
      return loginButton.isDisplayed();
    } catch (Exception e) {
      return false;
    }
  }
}
