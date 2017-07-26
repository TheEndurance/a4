<?php
include('includes/header.html');
$errors = array();

$errorDictionary = array(
    "postal-code" => "Incorrect postal code, acceptable formats are N2L 2S3 or N2L-2S3 or N2L2S3",
    "phone-number" =>  "Incorrect phone number, acceptable formats are (999)-999-9999 or (999) 999 9999 or (999)9999999",
    "name" =>  "The Name field is required",
    "city" =>  "The City field is required",
    "address" => "The Address field is required",
    "province" => "The Province field is required"
);

$validationRules = array(
    "postal-code" => "/^[A-Za-z]\d[A-Za-z][-\s]?\d[A-Za-z]\d$/",
    "phone-number" => "/^[(]{1}[0-9]{3}[)]{1}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/",
    "name" => "/.+/s",
    "city" => "/.+/s",
    "address" => "/.+/s",
    "province" => "/.+/s"
);

$salesTax = array(
    'Ontario' => 0.13,
    'Alberta' => 0.05,
    'British Columbia' => 0.12,
    'Manitoba' => 0.13,
    'New Brunswick' => 0.15,
    'Newfoundland and Labrador' => 0.15,
    'Northwest Territories' => 0.05,
    'Nova Scotia' => 0.15,
    'Nunavut' => 0.05,
    'Prince Edward Island' => 0.15,
    'Quebec' => 0.14975,
    'Saskatchewan' => 0.11,
    'Yukon' => 0.05
);

function ValidatePostVariable($post_variable){
    global $errorDictionary,$validationRules,$errors;
    if (empty($_POST[$post_variable])){
        $errors[]=$errorDictionary[$post_variable];
    } else {
        if(preg_match($validationRules[$post_variable],$_POST[$post_variable])!=1){ //Not valid
            $errors[]=$errorDictionary[$post_variable]; 
        } else {
            return $_POST[$post_variable];
        }
    }
    return null;
}



if ($_SERVER['REQUEST_METHOD']=='POST'){ // POST

    if (count(json_decode($_POST['json'],true))==0){
        $errors[]="No items in the shopping cart";
    } else {
        $shoppingcart = json_decode($_POST['json'],true);
        $subTotal = (float)$_POST['sub-total'];
    }

    $name = ValidatePostVariable('name'); 
    $postalCode = ValidatePostVariable('postal-code');
    $address = ValidatePostVariable('address');
    $phone =ValidatePostVariable('phone-number');
    $city = ValidatePostVariable('city');
    $province = ValidatePostVariable('province');
    $shippingCost = 0.00;
    $deliveryTime ="";

    if($subTotal >=0.01 && $subTotal <=25.00){
        $shippingCost = 3.00;
        $subTotal = $subTotal + $shippingCost ;
        $deliveryTime = "1 day";
    } elseif($subTotal >=25.01 && $subTotal <=50.00){
         $shippingCost = 4.00;
        $subTotal = $subTotal + $shippingCost;
        $deliveryTime = "1 day";
    } elseif($subTotal >=50.01 && $subTotal <=75.00){
        $shippingCost = 5.00;
        $subTotal = $subTotal + $shippingCost;
        $deliveryTime = "3 days";
    } elseif($subTotal >75.00){
        $shippingCost = 6.00;
        $subTotal = $subTotal + $shippingCost;
        $deliveryTime = "4 days";
    }

    if (strlen($province)>0){
        $tax = $salesTax[$province] * $subTotal; 
        $grandTotal = $tax + $subTotal;
    } else {
        $tax = 0.00;
        $grandTotal = $subTotal;
    }
    
    if (count($errors)>0){ //errors found
    ?>
        <div class="container">
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <strong>Order unsuccessful!</strong> Please navigate back to the <a class="alert-link" href="index.php">previous page</a> and correct the following errors:
            </div>
            <div>
                <ul id="compound-error-list">
    <?php
        foreach($errors as $error){
            echo '<li>'. $error .'</li>' ;
        }
    ?>
                </ul>
            </div>
        </div>
    <?php
    } else {
    
?>
    <div class="container">
        <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>Order successful!</strong> View your order summary below.
        </div>
        <div class="well col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6">
                    <address>
                        <h4>Shipping Address:</h4>
                        <strong><?php echo $name ;?></strong><br>
                        <?php echo $address; ?><br>
                        <?php echo $city . ', ' . $postalCode; ?><br>
                        <?php echo $province;?><br>
                        <span class="glyphicon glyphicon-phone"></span> <?php echo $phone ?>
                    </address>
                </div>
            </div>
            <div class="row">
                <div class="text-center">
                    <h1>Order Summary</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <table id="receipt" class="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Total</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>                      
        <?php
        foreach($shoppingcart as $item){
        ?>
                        <tr>
                            <td class="col-sm-6 col-md-6">
                                <div class="media">
                                    <a class="thumbnail pull-left" href="#"> <img class="media-object" src="<?php echo $item['product']['image'] ;?>" style="width: 72px; height: 72px;"> </a>
                                    <div class="media-body">
                                        <h4 class="media-heading"><a href="#"><?php echo $item['product']['name'] ;?></a></h4>
                                        <span>Status: </span><span class="text-success"><strong>In Stock</strong></span>
                                    </div>
                                </div>
                            </td>
                            <td class="col-sm-3 col-md-3" style="text-align: center"><?php echo $item['quantity'];?> </td>
                            <td class="col-sm-1 col-md-1 text-center"><strong>$<?php echo $item['product']['price'] ;?></strong></td>
                            <td class="col-sm-1 col-md-1 text-center"><strong>$<?php echo ($item['product']['price'] * $item['quantity']) ;?></strong></td>
                        </tr>
        <?php
        } // END For each
        ?>
                        <tr>
                            <td  class="col-sm-6 col-md-6"></td>
                            <td class="col-sm-2 col-md-2"></td>
                            <td class="col-sm-2 col-md-2">
                                <h4>Sub Total</h4>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <h4 id="grand-total"><strong>$<?php echo number_format($subTotal,2);?></strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td  class="col-sm-6 col-md-6"></td>
                            <td class="col-sm-2 col-md-2"></td>
                            <td class="col-sm-2 col-md-2">
                                <h4>Shipping</h4>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <h4 id="grand-total"><strong>$<?php echo number_format($shippingCost,2);?></strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td  class="col-sm-6 col-md-6"></td>
                            <td class="col-sm-2 col-md-2"></td>
                            <td class="col-sm-2 col-md-2">
                                <h4>Tax</h4>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <h4 id="grand-total"><strong>$<?php echo number_format($tax,2);?></strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td  class="col-sm-6 col-md-6"></td>
                            <td class="col-sm-1 col-md-1"></td>
                            <td class="col-sm-3 col-md-3">
                                <h3>Grand Total</h3>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <h3 id="grand-total"><strong>$<?php echo number_format($grandTotal,2);?></strong></h3>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <h3 class="text-center">Estimated Delivery Date: <?php echo $deliveryTime; ?></h3>
            </div>
        </div>
    </div>
<?php
    } // ELSE no errors
} // END POST

include('includes/footer.html');
?>