package zorchi.rest.exeption;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {
	private static final long serialVersionUID = -5724630149535766317L;
}